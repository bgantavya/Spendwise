# Report Web Vitals

## Description

This function, `reportWebVitals`, is designed to measure and report on key web performance metrics using the `web-vitals` library. It asynchronously imports the necessary functions (`getCLS`, `getFID`, `getFCP`, `getLCP`, `getTTFB`) and then calls each of them with a callback function (`onPerfEntry`). This allows developers to collect data on metrics like Cumulative Layout Shift (CLS), First Input Delay (FID), First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Time to First Byte (TTFB).

## How to Use

1.  **Installation:**

    This function relies on the `web-vitals` library. Install it using npm or yarn:

    ```bash
    npm install web-vitals
    # or
    yarn add web-vitals
    ```

2.  **Import and Call:**

    Import the `reportWebVitals` function and call it, passing a callback function (`onPerfEntry`) that will be executed for each web vital metric.

    ```javascript
    import reportWebVitals from './reportWebVitals';

    const sendToAnalytics = ({ name, delta, id }) => {
      // Example: Send metric to Google Analytics
      console.log(`Metric: ${name}, Delta: ${delta}, ID: ${id}`);
    };

    reportWebVitals(sendToAnalytics);
    ```

    The `onPerfEntry` callback will receive an object containing the `name` of the metric, the `delta` (change in value), and a unique `id`.

## Technologies Used

*   JavaScript
*   [web-vitals](https://github.com/GoogleChrome/web-vitals) library

## Code Overview

The `reportWebVitals` function performs the following steps:

1.  Checks if the `onPerfEntry` argument is a function.
2.  Asynchronously imports the `web-vitals` library using `import('web-vitals')`.
3.  Once the library is loaded, it retrieves the `getCLS`, `getFID`, `getFCP`, `getLCP`, and `getTTFB` functions.
4.  Calls each of these functions with the provided `onPerfEntry` callback.  Each `get` function measures the specific web vital and calls `onPerfEntry` with the measurement data.

## Known Issues / Improvements

*   **Error Handling:** The current implementation lacks explicit error handling for the dynamic import.  Adding a `.catch()` block to handle potential import errors would improve robustness.
*   **Callback Validation:**  While it checks if `onPerfEntry` is a function, it doesn't validate the structure of the object passed to it.

## Additional Notes

*   This function is typically used in the root `index.js` or `App.js` file of a React application (or similar entry point for other frameworks).
*   The `web-vitals` library is developed and maintained by Google Chrome.