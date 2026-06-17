# Database Documentation

## Overview

The POS Inventory Management System uses MySQL as the database.

The database stores product information, sales transactions, and sales transaction details.

The system uses Philippine Peso (PHP) currency format (₱) for all monetary values.

---

# Database Tables

The system contains the following required tables:

- Products
- Sales
- Sales Details

---

# Products Table

## Purpose

Stores product information and inventory quantity.

| Field | Description |
|---|---|
| Product ID | Unique identifier of the product |
| Product Name | Name of the product |
| Price | Product price in Philippine Peso (PHP) |
| Stock Quantity | Current available stock quantity |
| Created At | Date and time the record was created |
| Updated At | Date and time the record was updated |

---

# Sales Table

## Purpose

Stores completed sales transactions.

| Field | Description |
|---|---|
| Sale ID | Unique identifier of the sale |
| Receipt Number | Unique receipt number generated for transaction |
| Total Amount | Total transaction amount in Philippine Peso (PHP) |
| Transaction Date | Date and time of the transaction |

---

# Sales Details Table

## Purpose

Stores the products included in each sales transaction.

| Field | Description |
|---|---|
| Sale Detail ID | Unique identifier of the sale detail |
| Sale ID | Reference to the related sale |
| Product ID | Reference to the related product |
| Quantity | Number of items purchased |
| Unit Price | Product price during transaction in PHP |
| Subtotal | Total amount per product item in PHP |

---

# Relationships

## Products and Sales Details

A product can have multiple sales details.

---

## Sales and Sales Details

A sale can have multiple sales details.

---

# Currency Format

All monetary fields use Philippine Peso:

Symbol:

₱

Examples:

₱50.00

₱1,000.00