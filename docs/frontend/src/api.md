# FinTrack API Client

## Folder Structure

*   `api.js` - Contains the Axios instance configuration, interceptors, token management, and API methods.

## Description

This module provides a centralized API client for the FinTrack application, built using Axios. It handles request configuration, token management (storage and attachment), and error handling for all API interactions. The client simplifies API calls throughout the application and promotes consistent error handling.

## How to Use

### Installation

This module assumes you have Axios installed in your project. If not, install it using npm or yarn:

```bash
npm install axios
# or
yarn add axios
```

### Usage

1.  **Import the API methods:**

    ```javascript
    import { login, fetchTransactions, addTransaction } from './api';
    ```

2.  **Call the API methods:**

    ```javascript
    login('username', 'password')
      .then(data => {
        console.log('Login successful:', data);
      })
      .catch(error => {
        console.error('Login failed:', error.message);
      });

    fetchTransactions()
      .then(transactions => {
        console.log('Transactions:', transactions);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error.message);
      });
    ```

## Technologies Used

*   JavaScript
*   Axios
*   `localStorage` (for token management)

## Architecture or Code Overview

### Key Components

*   **`apiBase`**: Dynamically sets the base URL based on the environment (`production` or `development`).
*   **`apiClient`**: An Axios instance configured with the base URL, headers, and interceptors.
*   **Token Management**: `getToken()` and `setToken()` functions handle storing and retrieving the authentication token from `localStorage`.
*   **Request Interceptor**: Automatically attaches the JWT token to the `Authorization` header of each request.
*   **Response Interceptor**: Extracts the data from successful responses and handles errors by providing user-friendly messages.
*   **API Methods**: Functions for specific API endpoints (e.g., `login`, `fetchTransactions`, `addTransaction`).

### Flow

1.  **Configuration**: The `apiBase` URL is determined based on the environment. An Axios instance (`apiClient`) is created with this base URL and default headers.
2.  **Request Interception**: Before each request, the request interceptor checks for a token in `localStorage`. If a token exists, it's added to the `Authorization` header.
3.  **API Call**: The appropriate API method (e.g., `login()`) is called with the required parameters.  This uses the configured Axios instance to make the HTTP request.
4.  **Response Interception**: After the API call, the response interceptor processes the result.
    *   **Success**: Extracts and returns the response data.
    *   **Error**: Handles various error scenarios (network errors, server errors, etc.) and returns a user-friendly error message.
5.  **Component Handling**: Components call the API methods and handle the returned data or error messages.

## Known Issues / Improvements

*   **Error Handling**:  The current error handling provides generic messages. More specific error handling based on different API responses could be implemented.
*   **Token Refresh**:  Implement token refresh logic to automatically refresh the token when it expires.
*   **Global Error Handling**: The commented-out 401 handling (`setToken(null); window.location.href = '/login';`) could be re-enabled or replaced with a more robust global error handling mechanism, possibly using a context or Redux.
*   **Typescript**: Consider migrating to TypeScript for improved type safety.

## Additional Notes or References

*   This API client uses `localStorage` for storing the token. Consider using `httpOnly` cookies for enhanced security, especially in production environments.
*   Refer to the Axios documentation for more details on configuration options and interceptors: [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)