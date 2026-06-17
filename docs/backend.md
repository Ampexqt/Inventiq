# Backend Documentation

## Overview

The backend is developed using Node.js, Express.js, and TypeScript.

The backend provides REST API services that manage products, process sales transactions, update inventory quantities, and provide dashboard data.

The backend communicates directly with the MySQL database.

---

# Technologies Used

* Node.js
* Express.js
* TypeScript
* MySQL

---

# Core Modules

## Product Management

Handles inventory-related operations.

Functions:

* Add products
* View products
* Edit products
* Delete products
* Retrieve product information

---

## Sales Transactions

Handles transaction processing.

Functions:

* Receive cart items
* Calculate transaction totals
* Generate receipt numbers
* Save sales transactions
* Save sales details
* Deduct sold quantities from inventory

---

## Dashboard

Provides data for dashboard statistics.

Returns:

* Total number of products
* Current inventory levels
* Total sales transactions
* Recent sales activity

---

# API Endpoints

## Products

### Get All Products

```http
GET /api/products
```

### Get Single Product

```http
GET /api/products/:id
```

### Create Product

```http
POST /api/products
```

### Update Product

```http
PUT /api/products/:id
```

### Delete Product

```http
DELETE /api/products/:id
```

---

## Sales

### Create Transaction

```http
POST /api/sales
```

### Get Transactions

```http
GET /api/sales
```

### Get Transaction Details

```http
GET /api/sales/:id
```

---

## Dashboard

### Get Dashboard Data

```http
GET /api/dashboard
```

---

# Sales Transaction Flow

1. User selects products.
2. Products are added to the cart.
3. Transaction request is sent to the server.
4. Product quantities are validated.
5. Total amount is calculated.
6. Receipt number is generated.
7. Sale record is stored.
8. Sale details are stored.
9. Product stock quantities are updated.
10. Transaction response is returned.

---

# Database Interaction

The backend communicates with the MySQL database to:

* Retrieve products
* Store product information
* Store sales transactions
* Store sales details
* Update inventory quantities
* Retrieve dashboard statistics

---

# Backend Responsibilities

The backend is responsible for:

* Processing requests
* Executing business logic
* Managing inventory updates
* Managing transaction records
* Communicating with the database
* Returning API responses
