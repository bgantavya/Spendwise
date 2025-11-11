# Transaction Controller

## Table of Contents
- [Description](#description)
- [How to Use](#how-to-use)
- [Technologies Used](#technologies-used)
- [Code Overview](#code-overview)
- [Known Issues / Improvements](#known-issues--improvements)
- [Additional Notes / References](#additional-notes--references)

## Description

This module provides controller functions for handling transaction-related operations, including retrieving, adding, and deleting transactions for a specific user. It interacts with the `Transaction` model to perform database operations.

## How to Use

1.  **Installation:** Ensure you have Node.js and npm installed. Install the required dependencies using `npm install`.
2.  **Import:** Import the controller functions into your route handler:

    ```javascript
    const { GetTransaction, AddTransaction, DeleteOneT, DeleteManyT } = require('./transaction.controllers');
    ```
3.  **Usage:** Use the functions in your route definitions, passing the `req` and `res` objects:

    ```javascript
    app.get('/transactions', GetTransaction);
    app.post('/transactions', AddTransaction);
    app.delete('/transactions/:id', DeleteOneT);
    app.delete('/transactions', DeleteManyT);
    ```

    *   `GetTransaction`: Retrieves all transactions for the authenticated user.
    *   `AddTransaction`: Adds a new transaction for the authenticated user.  Requires `description`, `amount`, `type`, and `category` in the request body.
    *   `DeleteOneT`: Deletes a specific transaction by its ID for the authenticated user.
    *   `DeleteManyT`: Deletes all transactions for the authenticated user.

## Technologies Used

*   JavaScript
*   Node.js
*   Mongoose (for MongoDB interaction)
*   Express.js (for routing)

## Code Overview

The module exports four asynchronous functions:

*   **`GetTransaction(req, res)`**:
    *   Retrieves transactions from the database, filtering by `userId` (obtained from `req.user`).
    *   Sorts transactions by timestamp in descending order.
    *   Returns the transactions as a JSON response.
    *   Handles server errors and returns a 500 status code with an error message.

*   **`AddTransaction(req, res)`**:
    *   Extracts `description`, `amount`, `type`, and `category` from the request body.
    *   Creates a new `Transaction` instance with the extracted data and the `userId` (obtained from `req.user`).
    *   Saves the new transaction to the database.
    *   Returns the newly created transaction as a JSON response with a 201 status code.
    *   Handles validation errors and returns a 400 status code with an error message.

*   **`DeleteOneT(req, res)`**:
    *   Deletes a transaction from the database based on its ID (`req.params.id`) and `userId` (obtained from `req.user`).
    *   Returns a 404 status code if the transaction is not found.
    *   Returns a success message as a JSON response if the transaction is deleted.
    *   Handles server errors and returns a 500 status code.

*   **`DeleteManyT(req, res)`**:
    *   Deletes all transactions associated with the authenticated user's `userId` (obtained from `req.user`).
    *   Returns a success message as a JSON response.
    *   Handles server errors and returns a 500 status code.

## Known Issues / Improvements

*   **Error Handling:** More specific error handling could be implemented for different types of errors.
*   **Validation:** Input validation could be added to the `AddTransaction` function to ensure data integrity.
*   **Authentication:** Assumes that `req.user` is populated by middleware, which is not included in this module.
*   **Testing:** Unit tests are needed to ensure functionality and prevent regressions.

## Additional Notes / References

*   This module assumes the existence of a `Transaction` model.
*   The `userId` is expected to be populated in the `req.user` object by an authentication middleware.