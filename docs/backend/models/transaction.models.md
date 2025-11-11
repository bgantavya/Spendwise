# Transaction Model

## Folder Structure

N/A

## Description

This module defines the Mongoose schema for a transaction, used to model financial transactions within an application. It includes details such as user ID, description, amount, type (income/expense), category, and timestamp.

## How to Use

1.  **Installation:**

    This model requires `mongoose` to be installed in your project.

    ```bash
    npm install mongoose
    ```

2.  **Usage:**

    Import the model into your application:

    ```javascript
    const Transaction = require('./transaction.models');
    ```

    Create a new transaction:

    ```javascript
    const newTransaction = new Transaction({
        userId: 'user_object_id',
        description: 'Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary',
        timestamp: Date.now()
    });

    newTransaction.save()
      .then(transaction => console.log('Transaction saved:', transaction))
      .catch(err => console.error('Error saving transaction:', err));
    ```

## Technologies Used

*   JavaScript
*   Mongoose
*   MongoDB

## Architecture or Code Overview

The `transactionSchema` defines the structure of a transaction document in MongoDB.

*   `userId`:  A reference to the `User` model, indicating which user the transaction belongs to.  It is a required field of type `ObjectId`.
*   `description`: A string describing the transaction.  It is a required field.
*   `amount`: A number representing the transaction amount.  It is a required field.
*   `type`:  A string indicating whether the transaction is an 'income' or 'expense'.  It is a required field with an enum validation.
*   `category`: A string specifying the transaction category. It is a required field.
*   `timestamp`: A date representing when the transaction occurred, defaulting to the current time.

The `mongoose.model('Transaction', transactionSchema)` creates a Mongoose model named 'Transaction' based on the defined schema.

## Known Issues / Improvements

*   Consider adding validation for the amount field (e.g., minimum value).
*   Add error handling and more comprehensive validation.
*   Explore indexing strategies for optimized querying.

## Additional Notes or References

*   Requires a MongoDB database connection.
*   Ensure the `User` model is defined for the `userId` reference to work correctly.