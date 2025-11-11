# Authentication-Based React App

## Folder Structure

```
.
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.css
│   ├── App.js
│   ├── api.js
│   ├── components
│   │   ├── AuthModal.js
│   │   └── Dashboard.js
│   └── index.js
└── yarn.lock
```

## Description

This React application implements user authentication to conditionally render a dashboard or an authentication modal. It leverages an API to check authentication status and manages user login/logout.

## How to Use

### Installation

1.  Clone the repository.
2.  Navigate to the project directory.
3.  Install dependencies: `yarn install` or `npm install`
4.  Start the development server: `yarn start` or `npm start`

### API Usage

The application relies on an API endpoint `/auth/status` to determine the authentication status. This endpoint should return a success status if the user is authenticated; otherwise, it should return an error.  This is handled by the `fetchAuthStatus` function in `api.js`.

## Technologies Used

*   React
*   JavaScript (ES6+)
*   CSS
*   `useEffect` and `useState` hooks
*   `yarn` or `npm` for package management

## Architecture/Code Overview

*   **App.js:** The main component that manages the application's state and authentication flow. It uses `useState` to track authentication status and a `useEffect` hook to check the initial authentication status upon mounting.
*   **AuthModal.js:** A component that renders the authentication form (login/register).  It calls `onAuthenticated` to update the authentication status in `App.js`.
*   **Dashboard.js:**  A component that renders the main application dashboard. It also provides a logout function, calling `onLogout` to update the authentication status in `App.js`.
*   **api.js:** Contains the `fetchAuthStatus` function, which makes an API call to determine the user's authentication status.

## Known Issues / Improvements

*   **Error Handling:**  More robust error handling should be implemented for API calls.
*   **UI/UX:**  The UI/UX can be improved with better styling and user feedback.
*   **API Implementation:**  The current API implementation is assumed and needs to be properly configured.
*   **Security:** Ensure secure handling of authentication tokens (e.g., using HttpOnly cookies).

## Additional Notes

*   License: MIT License (To be determined)
*   Author: Gantavya Bansal