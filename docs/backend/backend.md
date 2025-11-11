# Budget Management Backend

## Folder Structure

```
backendCode/
├── controllers/
│   ├── advisor.controllers.js
│   ├── auth.controllers.js
│   ├── budget.controllers.js
│   └── transaction.controllers.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   ├── budget.models.js
│   ├── transaction.models.js
│   └── user.models.js
└── server.js
```

*   [controllers](#controllers)
*   [middleware](#middleware)
*   [models](#models)
*   [server.js](#server.js)

## Description

This backend application provides a REST API for managing budgets and financial transactions. It includes user authentication, budget creation, transaction tracking, and advisor-related functionalities.

## How to Use

1.  **Installation:**

    *   Clone the repository.
    *   Install dependencies: `npm install`
    *   Configure environment variables (e.g., database connection).
2.  **Running the Application:**

    *   Start the server: `npm start`

    *   The server will run on the specified port (default: 3000).
3.  **API Endpoints:** (Examples)

    *   `POST /auth/register` - Register a new user.
    *   `POST /auth/login` - Login user.
    *   `POST /budgets` - Create a new budget.
    *   `GET /budgets` - Get all budgets for a user.
    *   `POST /transactions` - Create a new transaction.
    *   `GET /transactions` - Get all transactions for a budget.

## Technologies Used

*   Node.js
*   Express.js
*   Mongoose (for MongoDB interaction)
*   JSON Web Tokens (JWT) for authentication
*   bcrypt for password hashing

## Architecture or Code Overview

*   **server.js:** Entry point of the application; sets up the Express server, connects to the database, and defines routes.
*   **models:** Defines the Mongoose schemas for users, budgets, and transactions.
    *   `user.models.js`: Defines the user schema (username, password, etc.).
    *   `budget.models.js`: Defines the budget schema (name, limit, etc.).
    *   `transaction.models.js`: Defines the transaction schema (amount, description, etc.).
*   **controllers:** Handles the business logic for each route.
    *   `auth.controllers.js`: Handles user registration and authentication.
    *   `budget.controllers.js`: Handles budget creation, retrieval, and updates.
    *   `transaction.controllers.js`: Handles transaction creation, retrieval, and updates.
    *   `advisor.controllers.js`: Handles advisor-related functionalities.
*   **middleware:** Contains middleware functions for authentication and authorization.
    *   `auth.middleware.js`: Verifies JWT tokens to protect routes.

## Known Issues / Improvements

*   **Error Handling:**  Implement more robust error handling and logging.
*   **Validation:** Add input validation to prevent invalid data.
*   **Testing:** Implement unit and integration tests.
*   **Security:** Implement rate limiting and other security best practices.

## Additional Notes / References

*   License: MIT (default)
*   Credits: Gantavya Bansal
*   Related Tools: Postman, MongoDB Compass