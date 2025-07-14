# Cin7 to Extensiv Sales Order Integration

This project demonstrates a one-way integration from **Cin7 Omni** (the client's inventory/order system) to **Extensiv** (3PL warehouse system), designed as a .NET Console Application. The integration extracts sales orders from Cin7 and transforms them into a format compatible with Extensiv's order creation API.

---
# Interpretation of Client Requirements

The client expects a lightweight integration that:

1. **Automatically sends basic sales order data** from Cin7 to their 3PL partner (Extensiv).
2. Ensures the 3PL can **fulfill the order** with sufficient product, delivery, and routing details.
3. Is designed to **run on-demand** (i.e., upon execution of the console app).
4. Handles **errors gracefully** and provides debug logs.

From this, I infer that the integration must:

- Extract all necessary sales order details from Cin7's API (`GET /SalesOrders/{id}`).
- Transform them into the expected structure for Extensiv's `POST /orders` API.
- Include the **line items**, **ship-to address**, **carrier info**, and **order reference**.
- Handle missing or malformed data without crashing the app.

---
## API Documentation References

- [Cin7 Sales Orders API](https://apidocs.cin7.com/reference#sales-orders)
- [Extensiv Create Orders API](https://api-docs.extensiv.com/reference/create-orders)


# Which data fields chose to map and why


## 1.Required Fields

| Short Meaning | 3PL Field | Required | Cin7 Field | Reason |
|---------------|-----------|----------|------------|--------|
| The Customer Identifier is the name of the Warehouse Customer. | `customerIdentifier` | Yes | MemberId / MemberEmail | Used to identify the customer; fallback to email if MemberId is not available. |
| The Facility Identifier is the name of the Warehouse setup in 3PL Central. | `facilityIdentifier` | Yes | DistributionCenter / DistributionBranchId | Primary source is DistributionCenter (string), fallback to BranchId with config mapping. |
| Use to identify the Order in 3PL Central,example the SalesOrder Number or PurchaseOrder number if OrderNumber is not Unique; Must be a unique value, UI does not accept duplicate Reference Numbers. | `referenceNum` | Yes | Reference | Reference is a customer-facing unique ID; fallback to internal ID if missing. |
| Set the Order Billing Type; Acceptable Default Values:<br>- Prepaid<br>- FreightCollect<br>- BillThirdParty<br><br>FedEx Acceptable values:<br>- collect<br>- recipient<br>- sender<br>- third party<br><br>UPS Acceptable value:<br>- BillThirdParty<br>- ConsigneeBilled<br>- FreightCollect<br>- Prepaid. | `billingCode` | Yes | freightDescription / paymentTerms / freightTotal | Billing party not explicitly provided; inferred via carrier, payment terms, and freight cost. |
| To turn on and set the "Insurance", "InsuranceType" and "Insurance Amount" when processing through Small Parcel Suite. | `routingInfo.carrier` | Yes | freightDescription | Represents carrier name (e.g., FedEx, UPS); used directly. |
| Deprecated: Marked the order as Requires Delivery Confirmation for. | `routingInfo.mode` | Yes | freightDescription / deliveryInstructions / paymentTerms | Mode not provided directly; inferred from freightDescription or delivery urgency. |
| Set the shipping Carrier Service (EX. | `shipTo.address1` | Yes | deliveryAddress1 | Standard shipping address field. |
| Set the Carrier Shipping Account Number for processing purposes. | `shipTo.city` | Yes | deliveryCity | City of recipient address. |
| Enter the Recipients Ship to Company Name, If no Company Name set, must pass the ShipTo. | `shipTo.state` | Yes | deliveryState | State or province of recipient. |
| Enter the Recipients Ship to Name, if no Name set, must pass the ShipTo.CompanyName. | `shipTo.zip` | Yes | deliveryPostalCode | Postal code of recipient address. |
| Enter the Recipients Ship To Address1. | `shipTo.country` | Yes | deliveryCountry | Country must match 3PL accepted values; convert to ISO-2 code if needed. |
| Enter the Recipients Ship To Address2. | `orderItems.itemIdentifier.sku` | Yes | LineItems[].Code / Barcode | SKU must match exactly with 3PL system; Code is preferred, fallback to Barcode. |
| Enter the Recipients Ship To City. | `orderItems.qty` | Yes | LineItems[].UomQtyOrdered / Qty | Use UOM quantity if available; otherwise use standard quantity. |

## 2.Optional Fields

| Short Meaning | 3PL Field | Required | Cin7 Field | Reason |
|---------------|-----------|----------|------------|--------|
| Add Warehouse Instructions; Any notes entered here will display in the Default Pick Ticket Printed Notes. | `notes` | No | InternalComments + LineItems[].lineComments | Combine order-level and line-level comments for pick ticket display. |
| Submit Carrier shipping Instructions. | `shippingNotes` | No | DeliveryInstructions | Provides delivery-specific notes or instructions. |
| Record the Order Advanced Ship Notice Number, if applicable at the order level. | `asnNumber` | No | InvoiceNumber | Use invoice number as ASN identifier. |
| Mark the order that it has a COD Amount for processing purposes; Use the "ShippingNotes" or "Notes" field to submit the COD Amount, if applicable. | `routingInfo.isCod` | No | N/A | Not provided; assumed false unless configured by payment terms. |
| To mark an order with Require return receipt when processing in Small Parcel Suite. | `shipTo.companyName` | No | deliveryCompany | Used if provided; fallback to contact name if empty. |
| Set Shipping Carrier this is a 'Free Form' field; Use the GET/Carriers API endpoint to map to the list of carriers setup for the Customer. | `shipTo.name` | No | DeliveryFirstName + DeliveryLastName | Full recipient name if company name is not provided. |
| Submit the Carriers SCAC Code; if applicable. | `shipTo.address2` | No | deliveryAddress2 | Additional shipping address details. |
| Enter the Recipients Ship To State. | `routingInfo.scacCode` | No | N/A | Cin7 does not provide SCAC; use carrier-to-SCAC mapping via config. |
| Enter the Recipients Ship To ZipCode. | `routingInfo.account` | No | customFields['carrierAccount'] (if configured) | Cin7 does not have a direct field; can be custom field or external mapping. |
| Enter the Recipients Ship To Country; See GET Countries to get a complete list of accepted codes. | `routingInfo.requiresDeliveryConf` | No | N/A | Deprecated in 3PL; no need to populate. |
| Sku Must be an exact match to what is setup in 3PL Central for the Customer. | `routingInfo.requiresReturnReceipt` | No | N/A | Not provided by Cin7; default to false unless specified. |
| The primary inventory quantity ordered; if not specified, must specify "SecondaryQty". | `shipTo.name` | No | DeliveryFirstName + DeliveryLastName | Used as fallback when deliveryCompany is not available; combines recipient's full name. |


#  Overall Approach and Design Decisions

This integration was built with clarity, reliability, and extensibility in mind. It connects **Cin7 Omni** (as the source of sales orders) to **3PL Central (Extensiv)** via secure HTTPS APIs, transforming and transmitting structured data using a layered architecture and robust authentication flow.

---

### 1. Modular Architecture & Adapter Pattern

The solution applies the **Adapter Pattern** to isolate transformation logic between systems with different data contracts. This improves maintainability and testability, especially as API schemas evolve or additional systems are introduced.

- The `IOrderAdapter` interface defines a consistent transformation contract.
- `OrderAdapter` implements the mapping from `Cin7Order` to `ExtensivOrder`.

```csharp
public interface IOrderAdapter
{
    ExtensivOrder Convert(Cin7Order source);
}
```

This pattern ensures low coupling between APIs and allows for future flexibility (e.g., integrating NetSuite → Extensiv).

---

### 2. Project Structure (Layered Design)

The project is organized into cleanly separated folders:

| Layer | Folder | Responsibility |
|-------|--------|----------------|
| **Models** | `Models/` | Data models (DTOs) for Cin7, Extensiv, and app settings |
| **Services** | `Services/` | Encapsulates API logic for Cin7 and 3PL |
| **Interfaces** | `Interfaces/` | Contracts for services and transfer logic |
| **Adapters** | `Adapters/` | Business logic to map Cin7 objects to 3PL schema |
| **ErrorHandling** | `ErrorHandling/` | Retry logic, logging, and exception policies |

This modular structure helps support separation of concerns, making the codebase easier to extend and maintain.

---

### 3. Secure Authentication & HTTPS Communication

Both Cin7 and 3PL Central APIs **require encrypted communication over HTTPS**. Plain HTTP is strictly prohibited by both platforms to ensure secure data exchange.

####  Cin7 Authentication

- Uses **Basic Authentication**.
- Each request includes a base64-encoded `username:apiKey` in the header.
- No token caching required (credentials are sent per request).

```http
Authorization: Basic <base64-encoded-credentials>
```

#### 3PL Central Authentication

- Uses **Token-based authentication** (OAuth-like).
- An access token is retrieved via `POST /AuthServer/api/Token`.
- The token **expires every hour** and is **auto-refreshed every 50–55 minutes**.

```http
Authorization: Bearer <access_token>
```

To ensure robust operation:
- Tokens are **cached in memory**.
- Retry logic attempts re-authentication if token is expired mid-call.
- Token reuse is enforced per best practices (no token-per-call).

---

### 4. Sales Order Flow

1. `Cin7ApiService` pulls sales order data via Cin7 REST API.
2. `OrderAdapter` transforms it to match Extensiv's expected structure.
3. `ExtensivApiService` authenticates and sends data via `POST /orders`.
4. `RetryPolicy` handles transient failures like expired tokens or network errors.
5. `ErrorLogger` writes logs for auditing and troubleshooting.

---

### 5.  Configuration & Flexibility

All credentials, mappings, and defaults are placed in `appsettings.example.json`, including:

- Cin7 credentials
- 3PL auth client info
- Facility/customer codes
- Billing and carrier fallbacks

This enables easy deployment across environments (e.g., staging, production).


# 🤔 Assumptions Made During the Integration

This integration required several assumptions due to gaps or ambiguities in the source (Cin7) data structure versus the target (Extensiv 3PL) API expectations. Below are the key assumptions made:

---

### 1.  Inferred Fields Without Direct Mapping

Some fields required by Extensiv’s `POST /orders` API do not have direct equivalents in the Cin7 `SalesOrders` schema. The following mappings were **inferred** based on business context or fallback logic:

| 3PL Field | Cin7 Source | Assumption |
|-----------|-------------|------------|
| `billingCode` | `freightDescription`, `freightTotal`, `paymentTerms` | No dedicated "billing type" exists in Cin7. I assumed the presence of freight charges or payment terms (e.g. "Prepaid") indicates billing method. |
| `routingInfo.mode` | `freightDescription`, `deliveryInstructions` | No explicit service level like "Ground" or "Overnight" is present. I inferred it from keywords in the freight or delivery notes. |
| `routingInfo.account` | `customFields['carrierAccount']` (if exists) | Cin7 doesn’t expose a shipping account field. I assumed it may be stored in a custom field or handled via config. |
| `routingInfo.scacCode` | Not provided | No SCAC code is returned from Cin7. I assumed this must be mapped externally from carrier name via configuration. |
| `customerIdentifier`, `facilityIdentifier` | `memberId`, `distributionCenter` or `branchId` | I assumed these identifiers must match 3PL-registered names, and would be derived from Cin7 values via config mapping. |

To avoid hardcoding and improve maintainability, these assumptions were made **configurable** via `appsettings.json`.

---

### 2.  Product and SKU Matching

- I assumed that **`LineItems[].Code`** is the primary SKU reference recognized by 3PL Central.
- If `Code` is missing, `Barcode` will be used as a fallback identifier.

The correctness of SKU mapping is critical for fulfillment accuracy and should be confirmed with the warehouse team.

---

### 3. Order Timing & Processing Triggers

- I assumed this integration runs **on-demand or scheduled**, not in real-time.
- Only **approved and dispatched** orders are eligible for sync. Draft, voided, or incomplete orders are skipped.

---

### 4.  Authentication Stability

- I assumed the authentication flows (Cin7 Basic Auth, 3PL token-based auth) are stable and consistent per documentation.
- I also assumed that 3PL tokens will be reused within their 1-hour TTL and refreshed proactively.




# ❓ What I Would Need to Clarify with the Client in a Real Scenario

To ensure that the integration operates accurately and meets business requirements, several areas would need to be clarified with the client during a real-world engagement:

---

### 1. Field Mapping Clarifications

- **Billing Code (`billingCode`)**: Since Cin7 does not explicitly provide this field, I would need to confirm the logic for mapping it (e.g., based on `freightDescription`, `paymentTerms`, or predefined config).
- **Carrier Account (`routingInfo.account`)**: Is there a specific custom field in Cin7 that stores the carrier account, or should it be configured statically per warehouse?
- **SCAC Code (`routingInfo.scacCode`)**: Cin7 doesn’t return this; should we maintain a config map from `freightDescription` to SCAC values?

---

### 2. Business Rules

- **Order Eligibility**: Should we only sync orders in "Approved + Dispatched" state? Or should we include "Draft", "On Hold", or partially fulfilled orders?
- **Return Orders / Cancelled Orders**: Are we responsible for pushing return or cancellation data to 3PL?
- **Partial Fulfillment**: How should we handle line items with split shipments?

---

### 3. Product & SKU Identification

- **Primary SKU Field**: Does the 3PL system always expect `Code` from Cin7, or is `Barcode` also accepted?
- **UOM Handling**: Should we always send `uomQtyOrdered` if it exists, or only use `qty`?

---

### 4. Multi-Warehouse or Multi-Facility

- **Facility Identifier Naming**: Does the 3PL expect a specific naming convention or external ID for `facilityIdentifier`?
- **Multiple Warehouses**: If multiple warehouses are used, is routing logic based on `branchId`, `distributionCenter`, or an external config?

---

### 5. Authentication & Access

- **3PL Token Scope**: Does the 3PL-issued token provide access to all customers and facilities under this account, or do we need separate credentials per warehouse?

---

### 6. Error Handling & Retries

- **Critical Field Failures**: If a required field (e.g., delivery address) is missing, should the integration skip that order and continue, or halt with an error?
- **Retry Strategy**: What are the client’s expectations for retrying failed API calls—immediate retry, backoff policy, or alert-only?
# 🚀 How I Would Enhance the Solution for Production Use

While the current implementation meets the requirements for a functional proof of concept, several enhancements would be necessary to make the solution robust, scalable, and production-ready:

---

###  1. Robust Error Handling & Monitoring

- Implement structured **logging** using a framework like Serilog or NLog.
- Introduce a centralized **error tracking system** (e.g., Sentry, Application Insights).
- Add retry logic with exponential backoff for transient network failures.

---

###  2. Configurable Scheduling & Job Management

- Integrate a **scheduler** (e.g., Quartz.NET or Hangfire) to automate order syncs at configurable intervals.
- Add support for manual reprocessing of failed orders via CLI arguments or a simple dashboard.

---

###  3. Enhanced Security

- Secure secrets (e.g., API keys, client secrets) using **Azure Key Vault**, **AWS Secrets Manager**, or user secrets.
- Ensure all outbound HTTP requests use **HTTPS only**, and validate TLS certificates.

---

### 4. Improved Test Coverage

- Add **unit tests** for adapters and mapping logic.
- Write **integration tests** for Cin7 and 3PL API endpoints using mock clients or staging environments.

---

###  5. Resilience & Recovery

- Add **dead-letter queue** support for failed payloads (e.g., write to file or DB for retry).
- Track last successful sync timestamp to avoid reprocessing orders.

---

###  6. Deployment & DevOps

- Containerize the solution using **Docker** for portability.
- Set up **CI/CD pipeline** (GitHub Actions, Azure DevOps, etc.) for automated build, test, and deploy.
- Support deployment in cloud environments like **Azure App Service** or **AWS Lambda** for scalability.

---

###  7. Dashboard & Reporting (Optional)

- Provide a lightweight **admin UI** to track sync status, recent jobs, and error logs.
- Include metrics (e.g., success/failure rate, processing time) for operational visibility.

