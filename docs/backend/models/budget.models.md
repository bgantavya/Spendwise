# Budget Model

## Folder Structure

N/A

## Description

This module defines the Mongoose schema for the `Budget` model. It includes the user ID and the budget amount. It also sets a default budget of zero.

## How to Use

1.  Import the model:

    ```javascript
    const Budget = require('./budget.model');
    ```

2.  Create a new budget:

    ```javascript
    const newBudget = new Budget({
        userId: 'userObjectId',
        amount: 1000
    });

    newBudget.save()
      .then(budget => console.log('Budget created:', budget))
      .catch(err => console.error('Error creating budget:', err));
    ```

## Technologies Used

*   JavaScript
*   Mongoose
*   MongoDB

## Architecture or Code Overview

*   **budgetSchema**: Defines the structure of a budget document in MongoDB.
    *   **userId**: `ObjectId`, a reference to the `User` model, and is unique.
    *   **amount**: `Number`, representing the budget amount, defaults to `0`.
*   **Budget Model**: The Mongoose model created from the `budgetSchema`.

## Known Issues / Improvements

*   No input validation.
*   Error handling could be improved.

## Additional Notes or References

*   This model assumes a one-to-one relationship between a user and a budget.
*   Requires Mongoose and MongoDB to be set up.