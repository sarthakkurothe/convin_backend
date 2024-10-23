# Daily Expenses Sharing Application

This is a Node.js and Express-based backend application that allows users to track and share daily expenses. The application includes features like user authentication, expense management, and a balance sheet generator. It also supports split payments among participants and tracks individual balances.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [User Authentication](#user-authentication-api-endpoints)
  - [Expense Management](#expense-management-api-endpoints)
- [Testing](#testing)
- [License](#license)

---

## Features

- **User Authentication**: JWT-based authentication with registration and login endpoints.
- **Expense Management**: CRUD operations for managing expenses, supporting split payments.
- **Balance Sheet Generator**: Downloadable balance sheet in CSV format.
- **Validation**: Middleware-based request validation for user and expense routes.
- **Error Handling**: Centralized error handling mechanism.
- **Unit Testing**: Jest and Supertest-based test coverage.

---

## Project Structure

```bash
  daily-expenses-app/
├── config/
│   └── db.js
├── controllers/
│   ├── userController.js
│   └── expenseController.js
├── models/
│   ├── userModel.js
│   └── expenseModel.js
├── routes/
│   ├── userRoutes.js
│   └── expenseRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── utils/
│   ├── balanceSheetGenerator.js
│   └── validators.js
├── tests/
│   ├── userRoutes.test.js
│   └── expenseRoutes.test.js
├── .env
├── app.js
├── package.json
└── README.md
```

