# Budget Controller

## Table of Contents

- [Description](#description)
- [How to Use](#how-to-use)
- [Technologies Used](#technologies-used)
- [Code Overview](#code-overview)
- [Known Issues/Improvements](#known-issuesimprovements)

## Description

This module provides controller functions for managing user budgets. It allows retrieving and setting budget amounts associated with a specific user.

## How to Use

1.  **Installation:** This module is part of a larger application and doesn't require separate installation. Ensure you have Node.js and npm installed.
2.  **Import:** Import the controller functions into your route handler.

    ```javascript
    const { GetBudget, SetBudget } = require('../controllers/budget.controllers');
    ```

3.  **Usage:**

    *   **GetBudget:** Retrieve the user's budget.

        ```javascript
        router.get('/budget', authMiddleware, GetBudget);
        ```

    *   **SetBudget:** Set or update the user's budget.

        ```javascript
        router.post('/budget', authMiddleware, SetBudget);
        ```

        The request body should contain the `amount` field.

        ```json
        {
            "amount": 1000
        }
        ```

## Technologies Used

*   JavaScript
*   Node.js
*   Mongoose (for interacting with MongoDB)

## Code Overview

The module consists of two main functions:

*   **`GetBudget(req, res)`:**
    *   Retrieves the budget associated with the authenticated user's ID (`req.user.userId`).
    *   If a budget exists, it returns the budget object.
    *   If no budget exists, it returns a JSON object with `amount: 0`.
    *   Handles server errors and returns a 500 status code with an error message.
*   **`SetBudget(req, res)`:**
    *   Retrieves the `amount` from the request body.
    *   Finds and updates the budget associated with the authenticated user's ID (`req.user.userId`). If no budget exists, it creates a new one (upsert).
    *   Returns the updated/created budget object.
    *   Handles server errors and returns a 500 status code with an error message.

## Known Issues/Improvements

*   **Error Handling:** More specific error handling could be implemented to provide more informative error messages to the client.
*   **Validation:** Input validation for the `amount` field is missing. It should be validated to ensure it's a valid number.
*   **Authentication:** Assumes `req.user.userId` is populated by an authentication middleware.  The presence and functionality of the middleware are not explicitly defined in this module.