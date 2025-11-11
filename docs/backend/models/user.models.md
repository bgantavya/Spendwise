# User Model

## Folder Structure

N/A

## Description

This module defines the User model using Mongoose, a MongoDB object modeling tool. It specifies the schema for user objects, including fields like username, password, first name, last name, and email. The schema also includes timestamps for tracking creation and update times.

## How to Use

1.  **Installation:** Ensure that Mongoose is installed in your project:

    ```bash
    npm install mongoose
    ```

2.  **Import:** Import the User model into your application:

    ```javascript
    const User = require('./user.models');
    ```

3.  **Create a new user:**

    ```javascript
    const newUser = new User({
        username: 'testuser',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
    });

    newUser.save()
           .then(user => console.log('User created:', user))
           .catch(err => console.error('Error creating user:', err));
    ```

## Technologies Used

*   JavaScript
*   Mongoose
*   MongoDB

## Architecture or Code Overview

The `userSchema` defines the structure of the User documents in the MongoDB collection.

*   `username`: String, required and unique. Used for user identification.
*   `password`: String, required for authentication.
*   `firstName`: String, optional first name of the user.
*   `lastName`: String, optional last name of the user.
*   `email`: String, optional email address of the user.
*   `timestamps`: Automatically adds `createdAt` and `updatedAt` fields to the schema.

The `mongoose.model('User', userSchema)` creates a Mongoose model named 'User' based on the defined schema, allowing you to interact with the `users` collection in MongoDB.

## Known Issues / Improvements

*   Password hashing is not implemented. Consider using bcrypt or a similar library for secure password storage.
*   Validation for email format is missing.
*   More comprehensive error handling can be added.

## Additional Notes or References

*   Mongoose documentation: [https://mongoosejs.com/](https://mongoosejs.com/)
*   Consider adding data validation and sanitization to improve data quality and security.