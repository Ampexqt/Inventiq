# Project Overview

## Introduction

**Inventiq** is a streamlined Point of Sale (POS) and Inventory Management system designed to efficiently manage products, process sales transactions, and monitor overall business metrics. The system is designed to be minimal, responsive, and highly performant.

## Objectives

- Provide an easy-to-use **Inventory Management** interface for tracking product stock levels and pricing.
- Streamline checkout processes through the **POS Module**.
- Safely and accurately store historical **Sales Transactions** and their individual details.
- Display a real-time **Dashboard** to monitor active product counts, revenue, and recent sales activities.

## System Architecture (Headless)

The project follows a decoupled **Headless Architecture**, where the frontend presentation layer is completely separated from the backend data and logic layer. They communicate exclusively via a REST API.

- **Frontend (Presentation Layer)**: A modern, standalone single-page application (SPA) built with React, TypeScript, and Vite. It runs in the user's browser, manages its own state and routing, and uses Tailwind CSS for a responsive UI. It consumes data from the backend via HTTP requests (using Axios).
- **Backend (Headless API)**: A lightweight, stateless RESTful API built with Node.js and Express.js using TypeScript. It is solely responsible for business logic, data validation, and database operations. It does not render any HTML views.
- **Database**: A MySQL database storing Products, Sales, and Sales Details.

## Key Features Implemented

1. **Dashboard**: Live updates on total products, current inventory, and recent sales.
2. **Products Module**: Full CRUD (Create, Read, Update, Delete) capabilities for managing the inventory catalog, including stock tracking.
3. **Point of Sale (POS)**: Shopping cart functionality that calculates totals and dynamically updates.
4. **Checkout & Receipts**: Finalizing transactions deducts from stock quantities automatically and records a timestamped sale with a unique receipt number.

## Guidelines

Development is strictly governed by the constraints listed in the `.agents/rules/rules.md` file, ensuring no unnecessary abstractions, out-of-scope features (like authentication or user roles), or third-party bloated libraries are introduced. All documentation in the `docs/` folder acts as the ultimate source of truth for the project's scope.
