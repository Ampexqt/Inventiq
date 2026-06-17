<div align="center">
  <h1>🛍️ Inventiq POS & Inventory System</h1>
  <p>A fast, modern, and beautiful Point of Sale and Inventory Management application.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
    <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  </p>
</div>

---

## 📌 Overview

**Inventiq** is a streamlined Point of Sale (POS) and Inventory Management system tailored for small-to-medium retail environments. It provides a lightning-fast, ultra-modern interface to process sales, manage stock quantities, and view real-time analytics without the clutter of unnecessary features.

This project was built adhering to strict, minimal-scope documentation, guaranteeing a robust, focused, and high-performance workflow.

## ✨ Key Features

- **📦 Inventory Management:** Easily add, edit, delete, and view products. Includes real-time stock tracking and dynamic low-stock alerts.
- **🛒 Point of Sale (POS):** A sleek catalog and cart interface for building orders. Auto-calculates totals and generates clean, professional digital receipts.
- **📈 Sales Transactions:** Track historical sales data, inspect individual receipt details in a beautiful modal, and monitor shop activity.
- **📊 Interactive Dashboard:** Get a bird's-eye view of your business with metrics on total revenue, active products, and low-stock warnings.

## 🛠️ Technology Stack

### Frontend (`/client`)
- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom UI components
- **Routing:** React Router DOM
- **HTTP Client:** Axios

### Backend (`/server`)
- **Environment:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MySQL (WAMP Server compatible)

## 📂 Project Structure

```text
Inventiq/
├── client/          # React + Vite frontend application
├── server/          # Node.js + Express backend API
├── database/        # MySQL database schemas and queries
└── docs/            # Strict project guidelines and documentation
```

## 🚀 Quick Start Guide

### 1. Database Setup
1. Ensure your local MySQL server (e.g., WAMP, XAMPP) is running.
2. Execute the `.sql` script found in the `database/` directory to construct the `inventiq` database and tables.

### 2. Backend Setup
```bash
cd server
npm install

# Create a .env file to set your DB credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=
# DB_NAME=inventiq

npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install

# The frontend defaults to http://localhost:5000/api 
# Create a .env and set VITE_API_URL to override this if needed

npm run dev
```
Navigate to `http://localhost:5173` to view the application!

## 📖 Documentation
For the absolute source of truth regarding database schemas, feature requirements, and UI guidelines, please refer exclusively to the `/docs` directory. No features fall outside the bounds of these strict guidelines.

---
<div align="center">
  <i>Designed with modern aesthetics and strict operational rules in mind.</i>
</div>
