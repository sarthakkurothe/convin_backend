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

**API Endpoints**

**1. User Authentication Endpoints**

**1.1 Register a New User**

- **URL**: /api/users/register
- **Method**: POST
- **Description**: Register a new user.
- **Request Body**:

json

Copy code

{

`  `"name": "John Doe",

`  `"email": "john@example.com",

`  `"password": "password123",

`  `"mobile": "1234567890"

}

- **Success Response**:
  - **Status**: 201 Created
  - **Response Body**:

json

Copy code

{

`  `"\_id": "user\_id",

`  `"name": "John Doe",

`  `"email": "john@example.com",

`  `"token": "jwt-token"

}

**1.2 Login User**

- **URL**: /api/users/login
- **Method**: POST
- **Description**: Log in an existing user.
- **Request Body**:

json

Copy code

{

`  `"email": "john@example.com",

`  `"password": "password123"

}

- **Success Response**:
  - **Status**: 200 OK
  - **Response Body**:

json

Copy code

{

`  `"\_id": "user\_id",

`  `"name": "John Doe",

`  `"email": "john@example.com",

`  `"token": "jwt-token"

}

**1.3 Get User Details**

- **URL**: /api/users/me
- **Method**: GET
- **Description**: Retrieve details of the authenticated user.
- **Authorization**: Bearer Token
- **Success Response**:
  - **Status**: 200 OK
  - **Response Body**:

json

Copy code

{

`  `"\_id": "user\_id",

`  `"name": "John Doe",

`  `"email": "john@example.com",

`  `"mobile": "1234567890"

}

**2. Expense Management Endpoints**

**2.1 Add a New Expense**

- **URL**: /api/expenses
- **Method**: POST
- **Description**: Add a new expense with details about title, amount, and participants.
- **Authorization**: Bearer Token
- **Request Body**:

json

Copy code

{

`  `"title": "Dinner",

`  `"amount": 100,

`  `"splitMethod": "equal",

`  `"participants": [

`    `{ "user": "user\_id1" },

`    `{ "user": "user\_id2" }

`  `]

}

- **Success Response**:
  - **Status**: 201 Created
  - **Response Body**:

json

Copy code

{

`  `"\_id": "expense\_id",

`  `"title": "Dinner",

`  `"amount": 100,

`  `"participants": [ "user\_id1", "user\_id2" ],

`  `"createdBy": "creator\_user\_id"

}

**2.2 Get User Expenses**

- **URL**: /api/expenses/user
- **Method**: GET
- **Description**: Get all expenses where the authenticated user is a participant.
- **Authorization**: Bearer Token
- **Success Response**:
  - **Status**: 200 OK
  - **Response Body**:

json

Copy code

[

`  `{

`    `"\_id": "expense\_id",

`    `"title": "Dinner",

`    `"amount": 100,

`    `"participants": [ "user\_id1" ],

`    `"createdBy": "creator\_user\_id"

`  `}

]

**2.3 Download Balance Sheet**

- **URL**: /api/expenses/download-balance-sheet
- **Method**: GET
- **Description**: Download a CSV file showing how expenses are split among participants.
- **Authorization**: Bearer Token
- **Response**: Downloads the CSV file.
-----
**API Testing with Postman**

1. **Postman Collection**: Create a new collection in Postman for the Daily Expense Sharing API.
1. Add individual requests for each endpoint (registration, login, expense management).
1. Use environment variables in Postman:
   1. base\_url = http://localhost:5000
   1. token = <your-token-from-login>
1. **Bearer Token**: For all authenticated requests, use the Bearer token from the login response.

For detailed step-by-step testing instructions, refer to the **API Testing Section** above.
