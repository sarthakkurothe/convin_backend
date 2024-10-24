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

## API Documentation

**1. User Authentication Endpoints**

**1.1 Register User**

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Description**:  Create a new user with name, email, password, and mobile number.
- **Request Body**:

```bash
  {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "mobile": "1234567890"
  }
```

Success Response:

- **Code:** 201 Created
- **Content:**

```bash
  {
  "_id": "64fa6bde7f8e5d2e3a2f9011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "<JWT_TOKEN>"
  }
```

Error Responses:

- **400 Bad Request-** Missing required fields

```bash
  {
  "message": "All fields are required"
  }
```

- **400 Bad Request-** User already exists

```bash
  {
  "message": "User already exists"
  }
```

**1.2 Login User**

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Description**: Authenticate a user with email and password, returning a JWT token.
- **Request Body**:

```bash
  {
  "email": "john@example.com",
  "password": "password123"
  }
```

**Success Response**:

- **Code**: 200 OK
- **Content**:

```bash
  {
  "_id": "64fa6bde7f8e5d2e3a2f9011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "<JWT_TOKEN>"
  }
```

Error Responses:

- **401 Unauthorized-** Invalid email or password:

```bash
  {
  "message": "Invalid email or password"
  }
```

**1.3 Get User Details**

- **URL**: `/api/users/me`
- **Method**: `GET`
- **Description**: Retrieve details of the authenticated user.
- **Authorization**: Bearer Token
  
**Success Response**:
  - **Code**: 200 OK
  - **Content**:

```bash
  {
  "_id": "64fa6bde7f8e5d2e3a2f9011",
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890"
  }
```

Error responses:

- **401 Unauthorized**- No token or invalid token:

```bash
{
  "message": "Not authorized, no token"
}
```

**2. Expense Management Endpoints**

**2.1 Add a New Expense**

- **URL**: `/api/expenses`
- **Method**: `POST`
- **Description**: Add a new expense and split it between users using one of the three methods: Equal, Exact, or Percentage.
- **Authorization**: Bearer Token (JWT)
- **Request Body**:
  - `description` (string): A short description of the expense.
  - `amount` (number): Total expense amount.
  - `paidBy` (string): The ID of the user who paid the amount.
  - `splitMethod` (string): The method used to split the expense. Options: `equal`, `exact`,        `percentage`.
  - `participants` (array): Array of user objects with details on how the expense is shared.        Each object contains:
    - `user` (string): The ID of the participant.
    - `exactAmount` (number) (for `exact` split)
    - `percentage` (number) (for `percentage` split)

**Example Request Body for Equal Split:**

```bash
  {
  "description": "Dinner with friends",
  "amount": 3000,
  "paidBy": "64fa6bde7f8e5d2e3a2f9011",
  "splitMethod": "equal",
  "participants": [
    { "user": "64fa6bde7f8e5d2e3a2f9011" },
    { "user": "64fa6bde7f8e5d2e3a2f9012" },
    { "user": "64fa6bde7f8e5d2e3a2f9013" }
    ]
  }
```

**Example Request Body for Exact Split:**

```bash
  {
  "description": "Shopping trip",
  "amount": 4299,
  "paidBy": "64fa6bde7f8e5d2e3a2f9011",
  "splitMethod": "exact",
  "participants": [
    { "user": "64fa6bde7f8e5d2e3a2f9011", "exactAmount": 1500 },
    { "user": "64fa6bde7f8e5d2e3a2f9012", "exactAmount": 799 },
    { "user": "64fa6bde7f8e5d2e3a2f9013", "exactAmount": 2000 }
    ]
  }
```

**Example Request Body for Percentage Split:**

```bash
  {
  "description": "Party expenses",
  "amount": 2000,
  "paidBy": "64fa6bde7f8e5d2e3a2f9011",
  "splitMethod": "percentage",
  "participants": [
    { "user": "64fa6bde7f8e5d2e3a2f9011", "percentage": 50 },
    { "user": "64fa6bde7f8e5d2e3a2f9012", "percentage": 25 },
    { "user": "64fa6bde7f8e5d2e3a2f9013", "percentage": 25 }
    ]
  }
```

**Success Response (201 Created):**

```bash
  {
  "_id": "64fa7bde7f8e5d2e3a2f9021",
  "description": "Dinner with friends",
  "amount": 3000,
  "paidBy": "64fa6bde7f8e5d2e3a2f9011",
  "splitMethod": "equal",
  "participants": [
    { "user": "64fa6bde7f8e5d2e3a2f9011", "amountOwed": 1000 },
    { "user": "64fa6bde7f8e5d2e3a2f9012", "amountOwed": 1000 },
    { "user": "64fa6bde7f8e5d2e3a2f9013", "amountOwed": 1000 }
    ]
  }
```

**Error Responses:**

1. **400 Bad Request:** Invalid data provided or missing fields.

```bash
  {
  "message": "Invalid input data"
  }
```

2. **401 Unauthorized:** No token or invalid token.

```bash
  {
  "message": "Not authorized, no token"
  }
```

3. **422 Unprocessable Entity:** Percentage split doesn't add up to 100%.

```bash
  {
  "message": "Percentages must add up to 100"
  }
```

**2.2 Get Individual User Expenses**

- **URL**: `/api/expenses/user/:userId`
- **Method**: `GET`
- **Description**: Retrieve all expenses where the user is a participant.
- **Authorization**: Bearer Token (JWT)

**Success Response (200 OK):**

```bash
  [
  {
    "_id": "64fa7bde7f8e5d2e3a2f9021",
    "description": "Dinner with friends",
    "amount": 3000,
    "paidBy": "64fa6bde7f8e5d2e3a2f9011",
    "splitMethod": "equal",
    "participants": [
      { "user": "64fa6bde7f8e5d2e3a2f9011", "amountOwed": 1000 },
      { "user": "64fa6bde7f8e5d2e3a2f9012", "amountOwed": 1000 },
      { "user": "64fa6bde7f8e5d2e3a2f9013", "amountOwed": 1000 }
    ]
  },
  {
    "_id": "64fa7bde7f8e5d2e3a2f9022",
    "description": "Shopping trip",
    "amount": 4299,
    "paidBy": "64fa6bde7f8e5d2e3a2f9011",
    "splitMethod": "exact",
    "participants": [
      { "user": "64fa6bde7f8e5d2e3a2f9011", "exactAmount": 1500 },
      { "user": "64fa6bde7f8e5d2e3a2f9012", "exactAmount": 799 },
      { "user": "64fa6bde7f8e5d2e3a2f9013", "exactAmount": 2000 }
      ]
    }
  ]
```

**Error Responses:**

1. **401 Unauthorized:**  No token or invalid token.

```bash
  {
  "message": "Not authorized, no token"
  }
```

2. **404 Not Found:** If the user does not have any recorded expenses.

```bash
  {
  "message": "No expenses found for this user"
  }
```

**2.2 Get Overall Expenses**

- **URL**: `/api/expenses/`
- **Method**: `GET`
- **Description**: Retrieve all expenses across all users.
- **Authorization**: Bearer Token (JWT)

**Success Response (200 OK):**

```bash
  [
  {
    "_id": "64fa7bde7f8e5d2e3a2f9021",
    "description": "Dinner with friends",
    "amount": 3000,
    "paidBy": "64fa6bde7f8e5d2e3a2f9011",
    "splitMethod": "equal",
    "participants": [
      { "user": "64fa6bde7f8e5d2e3a2f9011", "amountOwed": 1000 },
      { "user": "64fa6bde7f8e5d2e3a2f9012", "amountOwed": 1000 },
      { "user": "64fa6bde7f8e5d2e3a2f9013", "amountOwed": 1000 }
    ]
  },
  {
    "_id": "64fa7bde7f8e5d2e3a2f9022",
    "description": "Shopping trip",
    "amount": 4299,
    "paidBy": "64fa6bde7f8e5d2e3a2f9011",
    "splitMethod": "exact",
    "participants": [
      { "user": "64fa6bde7f8e5d2e3a2f9011", "exactAmount": 1500 },
      { "user": "64fa6bde7f8e5d2e3a2f9012", "exactAmount": 799 },
      { "user": "64fa6bde7f8e5d2e3a2f9013", "exactAmount": 2000 }
    ]
  }
]
```

**Error Reponses:**

1. **401 Unauthorized:** No token or invalid token.

```bash
  {
  "message": "Not authorized, no token"
  }
```

**2.4 Download Balance Sheet**

**2.2 Get Overall Expenses**

- **URL**: `/api/expenses/download-balance-sheet`
- **Method**: `GET`
- **Description**: This endpoint allows the authenticated user to download a balance sheet     detailing expenses shared with other participants. The balance sheet shows how much each participant owes or is owed, based on the split method used for each expense. It can be generated in CSV or PDF format.
- **Authorization**: Bearer Token (JWT)

**Expected Responses:**

- **Status:** `200 OK`
- **Response Body:** This endpoint allows the authenticated user to download a balance sheet detailing expenses shared with other participants. The balance sheet shows how much each participant owes or is owed, based on the split method used for each expense. It can be generated in CSV or PDF format.
- **Sample CSV Format:**

```bash
  Expense Title,Amount,Owed By,Owed To,Amount Owed
  Dinner,100,John Doe,Jane Smith,50
  Groceries,150,John Doe,Jane Smith,75
```

**Error Reponses:**

1. **401 Unauthorized:** Missing token or invalid token.

```bash
  {
  "message": "Not authorized, no token"
  }
```

2. **404 Not Found:** If no expenses exist for the user.

```bash
{
  "message": "No expenses found"
}
```
