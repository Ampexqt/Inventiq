# Folder Structure

## Project Structure

```text
inventiq/

├── .agents/
│   ├── rules/
│   │   └── rules.md
│   └── skills/
│       ├── mysql-local-operator/
│       │   └── SKILL.md
│       ├── react-component-generator/
│       │   └── SKILL.md
│       └── sales-transaction-tester/
│           └── SKILL.md
│
├── client/
│
│   ├── public/
│   │
│   ├── src/
│   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   ├── products/
│   │   │   ├── pos/
│   │   │   └── shared/
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── POS.tsx
│   │   │   └── SalesTransactions.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── types/
│   │   │
│   │   ├── hooks/
│   │   │
│   │   ├── layouts/
│   │   │
│   │   ├── routes/
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
│
├── server/
│
│   ├── src/
│   │
│   │   ├── controllers/
│   │   │   ├── productController.ts
│   │   │   ├── salesController.ts
│   │   │   └── dashboardController.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── productRoutes.ts
│   │   │   ├── salesRoutes.ts
│   │   │   └── dashboardRoutes.ts
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── models/
│   │   │
│   │   ├── config/
│   │   │   └── db.ts
│   │   │
│   │   ├── middleware/
│   │   │
│   │   ├── utils/
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
│
├── database/
│   └── database.sql
│
├── docs/
│   ├── project-overview.md
│   ├── workflow.md
│   ├── folder-structure.md
│   ├── database.md
│   ├── frontend.md
│   └── backend.md
│
├── README.md
│
└── .gitignore
```

---

## Client

The client contains the user interface of the application.

Responsibilities:

* Display dashboard information.
* Manage products.
* Process sales transactions.
* Display sales records.
* Communicate with the server through API requests.

---

## Server

The server contains the application logic and database operations.

Responsibilities:

* Handle API requests.
* Process sales transactions.
* Manage inventory data.
* Generate receipt numbers.
* Store transaction records.
* Communicate with the MySQL database.

---

## Database

The database stores:

* Products
* Sales
* Sales Details

and serves as the central data storage for the application.

---

## Documentation

The docs folder contains project documentation and development references used throughout the project lifecycle.

---

## Agents / Skills

The `.agents` folder contains rules and guidelines for AI coding assistants to follow when working on the project.

- `rules/`: Global project rules, architectural constraints, and standard operating procedures.
- `skills/`: Custom task-specific instructions to assist the AI (e.g., generating standardized React components, securely operating the local MySQL database, and verifying the end-to-end POS sales transactions).
