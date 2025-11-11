# FinTrack Backend API

## Folder Structure

```
.
├── config
│   └── db.js
├── controllers
│   ├── auth.controllers.js
│   ├── budget.controllers.js
│   ├── transaction.controllers.js
│   └── advisor.controllers.js
├── middleware
│   └── auth.middleware.js
├── server.js
└── package.json
```

## Description

This backend API powers the FinTrack application, providing authentication, transaction management, budgeting, and AI-powered financial advice. It's built with Node.js, Express, and MongoDB.

## How to Use

### Installation

1.  Clone the repository.
2.  Navigate to the project directory in your terminal.
3.  Run `npm install` to install dependencies.
4.  Create a `.env` file in the root directory and configure the environment variables (see `.env.example` if available).  You will need to provide a MongoDB connection string and a JWT secret.
5.  Run `npm start` to start the server.

### API Endpoints

*   **Authentication:**
    *   `POST /api/register`: Register a new user.
    *   `POST /api/login`: Log in an existing user.
    *   `GET /api/auth_status`: Verify user authentication status.

*   **Transactions:**
    *   `GET /api/transactions`: Get all transactions (requires authentication).
    *   `POST /api/transactions`: Add a new transaction (requires authentication).
    *   `DELETE /api/transactions/:id`: Delete a specific transaction (requires authentication).
    *   `DELETE /api/transactions`: Delete many transactions (requires authentication).

*   **Budget:**
    *   `GET /api/budget`: Get budget (requires authentication).
    *   `POST /api/budget`: Set budget (requires authentication).

*   **AI Advisor:**
    *   `GET /api/coach`: Get financial advice from the AI advisor (requires authentication).

## Technologies Used

*   Node.js
*   Express.js
*   MongoDB
*   Mongoose
*   JSON Web Tokens (JWT)
*   cors
*   dotenv

## Architecture and Code Overview

*   `server.js`: Main entry point. Sets up the Express app, middleware, and routes.
*   `config/db.js`: Handles the MongoDB database connection.
*   `controllers/`: Contains route handlers for authentication, transactions, budgeting, and AI advice.
    *   `auth.controllers.js`: Handles user registration, login, and authentication status.
    *   `transaction.controllers.js`: Manages transaction-related operations.
    *   `budget.controllers.js`: Manages budget-related operations.
    *   `advisor.controllers.js`: Provides AI-powered financial advice.
*   `middleware/auth.middleware.js`: Middleware for authenticating requests using JWTs.

## Known Issues / Improvements

*   Input validation is not comprehensive and could be improved.
*   Error handling could be more granular.
*   Rate limiting is not implemented.
*   Consider implementing more robust logging.

## Additional Notes

*   This API is designed to work with the FinTrack frontend application.
*   Ensure you have MongoDB installed and running before starting the server.