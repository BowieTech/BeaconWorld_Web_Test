# Cin7 to Extensiv Sales Order Integration

## 📋 Overview
This project demonstrates a one-way integration from **Cin7 Omni** (the client's inventory/order system) to **Extensiv** (3PL warehouse system), designed as a .NET Console Application. The integration extracts sales orders from Cin7 and transforms them into a format compatible with Extensiv's order creation API.
### Technical Stack & Framework

- **Framework**: .NET 9.0 Console Application
- **Architecture**: Layered architecture with Dependency Injection
- **Design Patterns**: Adapter Pattern, Repository Pattern, Service Layer Pattern
- **HTTP Client**: Built-in HttpClient with custom API services
- **Authentication**:
  - Cin7: Basic Authentication (username:apikey)
  - Extensiv: OAuth 2.0 Token-based authentication with auto-refresh
- **Configuration**: Microsoft.Extensions.Configuration with JSON-based configuration and first-time setup wizard
- **Data Serialization**: Newtonsoft.Json 13.0.3 for API request/response handling
- **Error Handling**: Comprehensive exception handling with detailed logging
- **Testing**: Integration tests and individual API endpoint testing
---
# Interpretation of Client Requirements

The client expects a lightweight, one-way integration that:

### Core Requirements
- **Automated Order Transfer**: Seamlessly move order data from Cin7 to Extensiv without manual intervention
- **Previous Day Order Processing**: Process orders modified on the previous day to ensure timely fulfillment
- **Duplicate Prevention**: Ensure orders are not processed multiple times through intelligent duplicate detection
- **Flexible Business Models**: Support various commercial models (one-time, subscription, pay-per-use)
- **Minimal Configuration**: Simple setup process with sensible defaults and configuration wizard
- **Error Handling**: Robust error handling with detailed logging for troubleshooting
- **Security**: Secure API communications with proper authentication mechanisms
- **Manual Execution**: Triggered manually via console application rather than continuous operation

### Business Value
- **Operational Efficiency**: Eliminate manual order entry and reduce processing time
- **Accuracy**: Reduce human errors in order transcription and field mapping
- **Scalability**: Handle varying order volumes without manual scaling
- **Cost Effectiveness**: Minimize operational overhead while maintaining reliability

### Based on these expectations, I designed the solution to:

- **Query orders modified on the previous day**, assuming that newly created or recently updated orders are ready for 3PL sync
- Use the `GET /SalesOrders?where=...` Cin7 API endpoint to retrieve multiple orders in a paginated fashion
- Map the order data into the required Extensiv format via an adapter class
- Include **line items, shipping address, billing info, and carrier routing instructions** in the transformation
- Log errors clearly and continue processing other records if individual orders fail validation or API submission
- Implement **duplicate detection** using Extensiv's RQL query functionality to prevent reprocessing
- Provide **comprehensive error handling** with detailed console output for troubleshooting
- Support **multiple business models** through configurable delivery model settings

---

# Which data fields chose to map and why

## API Documentation References

- [Cin7 Sales Orders API](https://apidocs.cin7.com/api/v1/SalesOrders?fields={fields}&where={where}&order={order}&page={page}&rows={rows})
- [Extensiv Create Orders API](https://secure-wms.com/orders)

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

---

### 2. Project Structure (Layered Design)
```
Cin7ToExtensiv/
├── Models/              # Data models for Cin7, Extensiv, and configuration
├── Services/            # API services and business logic
├── Interfaces/          # Service contracts and abstractions
├── Adapters/            # Order transformation and mapping logic
└── Configuration/       # Settings and credential management
```
---

### 3. Secure Authentication & HTTPS Communication

Both Cin7 and 3PL Central APIs **require encrypted communication over HTTPS**. Plain HTTP is strictly prohibited by both platforms to ensure secure data exchange.

####  3.1 Cin7 Authentication

- Uses **Basic Authentication**.
- Each request includes a base64-encoded `username:apiKey` in the header.
- No token caching required (credentials are sent per request).

```http
Authorization: Basic <base64-encoded-credentials>
```

#### 3.2 3PL Central Authentication

- Uses **Token-based authentication** (OAuth-like).
- An access token is retrieved via `POST /AuthServer/api/Token`.
- The token **expires every hour** and is **auto-refreshed every 50–55 minutes**.

```http
Authorization: Bearer <access_token>
```

#### 3.3 Token Management & Storage:
- **Token Storage**: Extensiv OAuth tokens are stored in-memory during application execution (not persisted to disk)
- **Token Lifecycle**: Tokens expire every 60 minutes and are automatically refreshed before expiration
- **Token Reuse**: Active tokens are reused for multiple API calls within the same execution session
- **Refresh Strategy**: Proactive token refresh occurs at 50-55 minute intervals to prevent expiration during operations

#### 3.4 Retry Mechanisms:
- **Authentication Failures**: Automatic retry with fresh token acquisition on 401 Unauthorized responses
- **Network Failures**: Built-in HttpClient retry for transient network issues
- **Rate Limiting**: Respects API rate limits with appropriate delays between requests
- **Token Refresh Failures**: Fallback to complete re-authentication if token refresh fails

#### 3.5 Security Features:
- **HTTPS Only**: All API communications encrypted via TLS/SSL
- **Credential Protection**: API keys and secrets stored in local configuration files (not in source code)
- **No Token Persistence**: OAuth tokens are never written to disk or logs for security
- **Secure Headers**: Proper HTTP headers including User-Agent, Accept, and Content-Type

---
### 4. Main Logic Flow

1. **Authentication Phase**: Validate Cin7 credentials and obtain Extensiv OAuth token
2. **Order Retrieval**: Query Cin7 API for orders modified in the previous day using date filters
3. **Data Validation**: Validate each order for required fields (customer, items, shipping address)
4. **Duplicate Detection**: Check Extensiv using RQL queries to prevent reprocessing existing orders
5. **Order Transformation**: Apply field mapping via OrderAdapter to convert Cin7 format to Extensiv format
6. **Order Submission**: Create orders in Extensiv via POST /orders API with proper error handling
7. **Result Tracking**: Log success/failure status for each order with detailed error messages
8. **Final Reporting**: Generate execution summary with statistics and recommendations
---

### 6. Configuration & Flexibility

 **First-time Setup Wizard**: Interactive configuration for easy deployment
- **Environment Support**: Configuration via appsettings.json with environment variable overrides
- **Business Model Support**: Four delivery models (One-Time, Pay-As-You-Go, Subscription, Just-in-Time)
- **Flexible Mappings**: Configurable customer IDs, facility IDs, and billing codes

#### Configuration Components:
- **Cin7 Credentials**: Username (email) and API Key configured in `appsettings.json` under `Cin7` section
- **3PL Auth Client Info**: Extensiv Client ID, Client Secret, and User Login ID configured under `Extensiv` section
- **Facility/Customer Codes**: Default Facility ID and Customer ID mappings configured under `Extensiv` section
- **Billing and Carrier Fallbacks**: Default billing codes and carrier mapping rules configured under `Extensiv` section

---


## Assumptions Made During the Integration

### 1. Business Assumptions

| Area | Assumption |
|------|------------|
| **Order Scope** | The integration is assumed to fetch **all orders modified on the previous UTC day** at the time of execution (e.g., 2025-07-14 from 00:00 to 23:59 UTC). |
| **Dispatched Status** | It is assumed that **orders modified the previous day have not yet been dispatched**, and **all earlier orders have already been dispatched**. |
| **Time Zone** | All timestamps returned by the Cin7 API are assumed to be in **UTC**, and **no timezone adjustments** are required during filtering or processing. |
| **Execution Model** | The integration is assumed to be **manually triggered** by the operator and not automated or real-time. |
| **Order Eligibility** | Only orders with status `Approved` and `Dispatched` are eligible for syncing. Draft or Voided orders are ignored. |
| **Volume Expectations** | The daily number of eligible orders is assumed to be **within 250 per day** (the default Cin7 pagination limit), unless clarified otherwise. |

---

### 2.Field Mapping Assumptions

| 3PL Field | Cin7 Field | Assumption |
|-----------|-------------|------------|
| `billingCode` | `freightDescription`, `freightTotal`, `paymentTerms` | Cin7 does not have a dedicated billing type field. I infer the billing method (e.g., Prepaid, Collect) from payment or freight context. |
| `routingInfo.mode` | `freightDescription`, `deliveryInstructions` | No service level indicator exists. I assume shipping urgency or service (e.g., Ground, Overnight) can be inferred from text content. |
| `routingInfo.account` | `customFields['carrierAccount']` (if exists) | Cin7 does not expose shipping account numbers. I assume this must be stored in a custom field or mapped via config. |
| `routingInfo.scacCode` | Not provided | Cin7 lacks SCAC codes. I assume these must be resolved via config mapping from carrier name (e.g., FedEx → FXFE). |
| `customerIdentifier` / `facilityIdentifier` | `memberId`, `distributionCenter`, `branchId` | These identifiers are assumed to be known values mapped from Cin7 to 3PL via config (e.g., mapping `branchId:3 → LAX-WH`). |
| `orderItems.itemIdentifier.sku` | `LineItems[].Code`, fallback to `Barcode` | 3PL requires exact SKU. I assume Cin7’s `Code` is the primary SKU; use `Barcode` if `Code` is missing. |
| `orderItems.qty` | `LineItems[].uomQtyOrdered` or `qty` | If `uomQtyOrdered` exists, use it as the primary quantity; otherwise, use standard `qty`. |

---

### 3. Implementation / Technical Assumptions

| Area                    |   Assumption                                                                                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API Reliability**          | Both the Cin7 and Extensiv APIs are assumed to be stable and reliable, with low failure rates and minimal downtime.                                             |
| **Time Zone Consistency**    | Cin7 and Extensiv operate in the same time zone or use a normalized standard (e.g., UTC), so no timezone offset handling is needed.                             |
| **Authentication**           | Cin7 Basic Auth credentials remain valid throughout execution. Extensiv OAuth tokens are assumed refreshable when expired (every hour).                         |
| **Token Refresh**            | 3PL tokens are reused within their 1-hour TTL, refreshed every ~55 minutes to avoid expiry errors.                                                  |
| **Pagination**               | A single day’s orders can be fetched using 250-record pagination. Further batching is handled as needed.    |
| **Configuration**            | The `appsettings.json` file is accessible and writable during first-time setup, and all required configuration sections are serializable/deserializable.        |
| **Flexible Delivery Models** | This integration supports various fulfillment models via the same API/config structure:<br>- One-Time (manual)<br>- Subscription (scheduled)<br>- Pay-as-you-go |



# 📌 What to Clarify with the Client Before Deployment

Before going live with the Cin7 → Extensiv integration, the following business and technical items should be confirmed with the client to ensure the solution fits their real-world operation and avoids unexpected behaviors.

---

## 1. Business Logic Clarifications

### Order Timeframe & Time Zone

* Are **Cin7 timestamps in UTC**, or should we apply a specific time zone (e.g., PST, AEST)?
* Should we pull **orders modified yesterday**, or **orders created yesterday**?

### Order Status Eligibility

* Should the integration only process `Approved` and `Dispatched` orders?
* What should happen if an order was previously sent and then **updated** in Cin7 — should it be re-sent?

### Duplicate Detection

* We use the Extensiv `referenceNum` to detect duplicates. Is that sufficient?
* If a duplicate is found, should we **skip**, **overwrite**, or **raise an alert**?

### Business Models & Fulfillment Flow

* Which business model(s) does the client use: **One-Time**, **Subscription**, **Just-in-Time**, or **Pay-As-You-Go**?
* Do they operate with **multiple facilities or warehouse customers**, and if so, should those be dynamically mapped?

### Error Handling Expectations

* Should failed orders be **reprocessed automatically** later, or handled manually?
* Would the client prefer **email reports**, **error logs**, or some dashboard for reviewing failed submissions?

---

## 2. Field Mapping Clarifications

### Customer & Facility Identifiers

* Can the client provide a mapping table between **Cin7 MemberId / BranchId** and **Extensiv customerIdentifier / facilityIdentifier**?

### SKU Format

* Does every product in Cin7 have a valid `Code`? Can we fall back to `Barcode`?
* Are **SKUs case-sensitive** in the Extensiv system?

### Billing Code Inference

* We infer the `billingCode` from `freightDescription`, `paymentTerms`, or `freightTotal`. Is this accurate for their billing setup?
* Do they have specific billing codes per **carrier or customer type**?

### SCAC and Carrier Accounts

* Can the client provide a **carrier-to-SCAC code mapping** (e.g., FedEx → FXFE)?
* Do they use multiple **carrier account numbers**, and if so, are they stored in **custom fields** in Cin7?

### Custom Fields

* Are any critical values (e.g., `carrierAccount`, `deliveryInstructions`) stored in **custom fields** in Cin7?
* Can the client provide sample data for reference?

---

## 3. Operational Setup & Deployment Support

### Local Environment Requirements

* Will the integration run on a **local server**, **cloud VM**, or **dedicated machine**?
* Is **.NET 9.0 runtime** already installed? Do they need help setting it up?

### Trigger Mechanism

* The solution is designed to be **manually run via console**. Does the client need support for:

  * **Windows Task Scheduler**
  * **cron job (Linux)**
  * or **a RESTful trigger wrapper**?

### Configuration & Secrets Management

* Will the `appsettings.json` file be updated directly?
* Do they prefer using **environment variables** or a **key vault** for sensitive data (e.g., API keys)?

### First-Time Testing & Support

* Does the client need **technical assistance during first deployment**?
* Should the first run be performed in a **staging / sandbox** environment?

---

# How I Would Enhance the Solution for Production Use

## 1. From the Client / Business Perspective

### Service Model Design per Fulfillment Type

* Clearly define how each business model is handled during integration:

  * **One-Time Purchase**: Orders are processed immediately with no recurring logic.
  * **Subscription (Monthly)**: Orders are generated based on a scheduled cadence (e.g., every 30 days).
  * **Pay-As-You-Go**: Orders are triggered dynamically when usage thresholds or triggers are met (requires usage tracking input).
  * **Event-Driven Fulfillment**: Orders are generated in response to specific events such as webhook triggers, external actions, or marketplace events.
* Add flags or configuration mappings to classify order type and define sync strategy accordingly.
* Ensure that future extensibility allows multiple models per customer or SKU as needed.

### Scheduled Automation

* Set up automatic execution using Windows Task Scheduler, cron job, or a cloud function (e.g., Azure Function).
* Ensures consistent daily syncs without manual intervention.

### Email Alerts & Reporting

* Add daily email reports for:

  * Successful order sync summaries
  * Failed orders with reasons
* Include CSV or log file attachments.

### Staging & Production Environment Separation

* Support separate config profiles for dev/staging/production.
* Use environment variables for safer deployment and CI/CD.

### Dashboard / Admin Interface

* Optional admin interface to:

  * View recent logs
  * Reprocess failed orders
  * Update mappings without editing JSON manually

### Audit Logging

* Add structured logs for:

  * API calls and results (redact sensitive data)
  * Duplicate detection reasons
  * Token lifecycle events

---

## 2. From the Code / Architecture Perspective

### Unit Test Coverage

* Expand test coverage with xUnit/NUnit.
* Test adapters, validators, and edge cases with mocked services.

### Logging Infrastructure

* Use Serilog or Microsoft.Extensions.Logging for structured logs.
* Enable writing to file, console, or external systems (e.g., Seq).

### Retry & Resilience Framework

* Add retry logic using Polly (for transient errors, rate limits).
* Implement exponential backoff and circuit-breaker patterns.

### Configuration Validation

* Validate appsettings.json schema at startup.
* Prevent runtime failures due to missing or invalid configs.

### Plug-in Architecture

* Decouple adapters to support multiple platforms in the future (e.g., Shopify → Extensiv).
* Register converters via DI or reflection.

### CLI Parameter Support

* Allow runtime options like:

  * \--from / --to date filters
  * \--dry-run for safe testing
  * \--verbose for debugging

### Containerization Support

* Package as Docker image for portability.
* Suitable for deploying in Kubernetes, ECS, or CI/CD pipelines.

---


