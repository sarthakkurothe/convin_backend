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

## Installation

1. Clone the repository:

```bash
  git clone https://github.com/sarthakkurothe/convin_backend.git
```

2. Navigate to the project directory:

```bash
  cd convin_backend_main
```

3. Install the dependencies:

```bash
  npm install
```

4. Create a `.env` file in the root of the project and add your MongoDB connection string and PORT.

```bash
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

5. Run the application:

```bash
npm run dev
```
