# Authentication Controller

## Table of Contents
- [Description](#description)
- [How to Use](#how-to-use)
- [Technologies Used](#technologies-used)
- [Code Overview](#code-overview)
- [Known Issues / Improvements](#known-issues--improvements)
- [Additional Notes / References](#additional-notes--references)

## Description

This module provides authentication controllers for user sign-in, sign-up, and verification. It uses `bcryptjs` for password hashing and `jsonwebtoken` for creating and verifying user tokens. It interacts with a user model to persist and retrieve user data.

## How to Use

### Installation

1.  Ensure you have Node.js and npm installed.
2.  Install the required dependencies:

    ```bash
    npm install bcryptjs jsonwebtoken
    ```

### Usage

1.  Import the functions into your route handlers or services.
2.  Call the respective functions (`SignIn`, `SignUp`, `VerifyUser`) based on the authentication flow.
3.  Make sure you have configured JWT_SECRET environment variable

Example:

```javascript
const { SignIn, SignUp, VerifyUser } = require('./auth.controllers');

// Example sign-in route
app.post('/signin', SignIn);

// Example sign-up route
app.post('/signup', SignUp);

// Example verify user route
app.get('/verify', middleware, VerifyUser);
```

## Technologies Used

-   Node.js
-   bcryptjs
-   jsonwebtoken
-   Mongoose (for User model interaction)

## Code Overview

### `SignIn(req, res)`

-   Authenticates a user given a username and password.
-   Finds the user by username.
-   Compares the provided password with the hashed password using `bcrypt.compare`.
-   Generates a JWT token using `jsonwebtoken` upon successful authentication.
-   Returns the token in the response.

### `SignUp(req, res)`

-   Registers a new user.
-   Hashes the user's password using `bcrypt.hash`.
-   Creates a new user instance using the User model.
-   Saves the user to the database.
-   Returns a success message.

### `VerifyUser(req, res)`

-   Verifies the user's authentication status using the JWT from the request.
-   Retrieves the user data from DB by user id.
-   Returns the user's username.

## Known Issues / Improvements

-   Input validation for sign-up and sign-in.
-   Password reset functionality.
-   Refresh token implementation.
-   Implement more comprehensive error handling and logging.

## Additional Notes / References

-   This module assumes that you have a User model defined and connected to a database (e.g., MongoDB).
-   Make sure to handle the `JWT_SECRET` environment variable securely in production.