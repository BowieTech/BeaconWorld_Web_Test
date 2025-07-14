
# Cin7 to Extensiv Sales Order Integration

This project demonstrates a one-way integration from **Cin7 Omni** (the client's inventory/order system) to **Extensiv** (3PL warehouse system), designed as a .NET Console Application. The integration extracts sales orders from Cin7 and transforms them into a format compatible with Extensiv's order creation API.

---

## Interpretation of Client Requirements

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

---

## Which Data Fields Were Mapped and Why

### Required Fields

| Short Meaning | 3PL Field | Required | Cin7 Field | Reason |
|---------------|-----------|----------|------------|--------|
| The Customer Identifier is the name of the Warehouse Customer. | `customerIdentifier` | Yes | MemberId / MemberEmail | Used to identify the customer; fallback to email if MemberId is not available. |
| The Facility Identifier is the name of the Warehouse setup in 3PL Central. | `facilityIdentifier` | Yes | DistributionCenter / DistributionBranchId | Primary source is DistributionCenter (string), fallback to BranchId with config mapping. |
| Use to identify the Order in 3PL Central; must be unique. | `referenceNum` | Yes | Reference | Reference is a customer-facing unique ID; fallback to internal ID if missing. |
| Order Billing Type. | `billingCode` | Yes | freightDescription / paymentTerms / freightTotal | Inferred via carrier, payment terms, and freight cost. |
| Shipping Carrier. | `routingInfo.carrier` | Yes | freightDescription | Carrier name (e.g., FedEx, UPS); used directly. |
| Carrier Service / Mode. | `routingInfo.mode` | Yes | freightDescription / deliveryInstructions / paymentTerms | Inferred from freightDescription or urgency. |
| Ship-To Address Line 1 | `shipTo.address1` | Yes | deliveryAddress1 | Standard shipping address field. |
| Ship-To City | `shipTo.city` | Yes | deliveryCity | City of recipient address. |
| Ship-To State | `shipTo.state` | Yes | deliveryState | State or province of recipient. |
| Ship-To Postal Code | `shipTo.zip` | Yes | deliveryPostalCode | Postal code of recipient address. |
| Ship-To Country | `shipTo.country` | Yes | deliveryCountry | Convert to ISO-2 if needed. |
| Item SKU | `orderItems.itemIdentifier.sku` | Yes | LineItems[].Code / Barcode | Exact match to 3PL's SKU. |
| Ordered Quantity | `orderItems.qty` | Yes | LineItems[].UomQtyOrdered / Qty | Prefer UOM if present. |

---

### Optional Fields

| Short Meaning | 3PL Field | Required | Cin7 Field | Reason |
|---------------|-----------|----------|------------|--------|
| Pick Ticket Notes | `notes` | No | InternalComments + LineItems[].lineComments | Combine order- and line-level notes. |
| Shipping Instructions | `shippingNotes` | No | DeliveryInstructions | Delivery-specific instructions. |
| ASN Number | `asnNumber` | No | InvoiceNumber | Invoice number as ASN. |
| COD Indicator | `routingInfo.isCod` | No | N/A | Assumed false unless configured. |
| Ship-To Company | `shipTo.companyName` | No | deliveryCompany | Fallback to contact name if missing. |
| Ship-To Name | `shipTo.name` | No | DeliveryFirstName + DeliveryLastName | Full recipient name. |
| Ship-To Address 2 | `shipTo.address2` | No | deliveryAddress2 | Additional address info. |
| SCAC Code | `routingInfo.scacCode` | No | N/A | Mapped externally from carrier. |
| Carrier Account | `routingInfo.account` | No | customFields['carrierAccount'] | Optional config or custom field. |
| Delivery Confirmation | `routingInfo.requiresDeliveryConf` | No | N/A | Deprecated field. |
| Return Receipt | `routingInfo.requiresReturnReceipt` | No | N/A | Default false unless specified. |
| Recipient Name | `shipTo.name` | No | DeliveryFirstName + DeliveryLastName | Used if company name not provided. |

---

## 🧠 Overall Approach and Design Decisions

This integration was designed with clarity, security, and adaptability in mind. Key decisions include:

### 🔧 Adapter Pattern

- Used to isolate the mapping logic (`Cin7Order` → `ExtensivOrder`).
- Facilitates clean transformations and supports future integration with other systems.

### 🗂️ Project Structure

| Layer | Folder | Role |
|-------|--------|------|
| Models | `Models/` | DTOs for Cin7/Extensiv |
| Services | `Services/` | API communication logic |
| Interfaces | `Interfaces/` | Contracts |
| Adapters | `Adapters/` | Mapping logic |
| ErrorHandling | `ErrorHandling/` | Retry, logging, etc. |

### 🔐 Secure Authentication

- Both APIs require **HTTPS only**.
- Cin7 uses **Basic Auth** per request.
- 3PL uses **Bearer Tokens** (refreshed every 50–55 mins).

---

## 🤔 Assumptions Made

- Cin7 doesn't provide billingCode or routingInfo.mode directly — inferred from `freightDescription`, `paymentTerms`, etc.
- SCAC code and shipping account may require configuration.
- SKU mapping assumes `Code` is primary, `Barcode` is fallback.
- Only "Approved + Dispatched" orders are synced.
- Authentication is stable as per API documentation.

---

## ❓ What I Would Need to Clarify with the Client

- Confirm logic for `billingCode`, `routingInfo.account`, and SCAC code.
- Clarify eligible order states (e.g., Draft, Voided?).
- Identify true SKU field expected by 3PL.
- Whether routing info like `mode` or `account` is stored in Cin7 or needs static mapping.
- Whether one auth token is valid across all customers/facilities.
- Policy for retrying failed orders and handling partial data.

---

## 🚀 How I Would Enhance the Solution for Production Use

- Structured logging (e.g., Serilog) and centralized error tracking (e.g., Sentry).
- Add Hangfire/Quartz.NET for configurable job scheduling.
- Move secrets to secure stores like AWS Secrets Manager.
- Add integration tests and mock endpoints.
- Enable retry queues and persist failed payloads.
- CI/CD automation using GitHub Actions or Azure DevOps.
- Optional admin dashboard for monitoring and analytics.

---
