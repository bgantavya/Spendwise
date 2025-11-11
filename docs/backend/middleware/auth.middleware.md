# Auth Middleware

## Folder Structure

* [auth.middleware.js](#authmiddlewarejs)

## Description

This middleware is responsible for authenticating JWT tokens sent in the `Authorization` header of incoming requests. It verifies the token's validity using a secret key stored in environment variables and attaches the decoded user information to the request object if the token is valid.

## How to Use

### Installation

No specific installation steps are required beyond having Node.js and npm/yarn installed. This is a module to be integrated into an existing Node.js application.

### Integration

1.  **Import the middleware:**
    ```javascript
    const authenticateToken = require('./path/to/auth.middleware.js');
    ```
2.  **Apply the middleware to protected routes:**
    ```javascript
    const express = require('express');
    const app = express();

    // ... other middleware and routes

    app.get('/protected-route', authenticateToken, (req, res) => {
        // If authentication is successful, req.user will contain the decoded token payload
        res.json({ message: 'Access granted!', user: req.user });
    });

    // ...
    ```

### Environment Variable

Ensure that the `JWT_SECRET` environment variable is set in your application's environment. This secret is used to sign and verify the JWT tokens.

```
JWT_SECRET=your_super_secret_key_here
```

## Technologies Used

*   [Node.js](https://nodejs.org/)
*   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (for JWT handling)
*   [Express.js](https://expressjs.com/) (commonly used with this type of middleware)

## Architecture or Code Overview

The `authenticateToken` function acts as Express.js middleware.

1.  **Token Extraction:** It retrieves the JWT from the `Authorization` header, expecting it in the format "Bearer TOKEN".
2.  **Token Presence Check:** If no token is found, it sends a `401 Unauthorized` status.
3.  **Secret Key Check:** It attempts to retrieve the `JWT_SECRET` from `process.env`. If not found, it logs an error and returns a `500 Internal Server Error`.
4.  **Token Verification:** It uses `jwt.verify()` to validate the token against the secret key.
    *   If verification fails (invalid token), it sends a `403 Forbidden` status.
    *   If verification succeeds, it attaches the decoded user payload to `req.user` and calls `next()` to pass control to the next middleware or route handler.

## Known Issues / Improvements

*   **Error Handling:** More specific error messages could be provided for different JWT verification errors (e.g., expired token, invalid signature).
*   **Token Blacklisting/Revocation:** This middleware does not support token revocation. For scenarios requiring immediate logout, a mechanism for blacklisting tokens would need to be implemented.
*   **Configuration Management:** The JWT secret is read directly from `process.env`. For more complex applications, a dedicated configuration management library might be beneficial.

## Additional Notes or References

*   **JWT (JSON Web Token):** [https://jwt.io/](https://jwt.io/)
*   **jsonwebtoken npm package:** [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)