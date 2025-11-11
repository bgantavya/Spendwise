# Advisor API

This API provides financial advice based on user transaction and budget data, leveraging Google's Generative AI (Gemini).

## Folder Structure

* [advisor.controllers.js](#advisorcontrollersjs)

## Description

The `advisor.controllers.js` file contains the `AdvisorAI` controller, which acts as the backend logic for providing financial advice. It fetches user transaction and budget data, constructs a prompt with this information, and sends it to the Gemini API to generate personalized financial tips.

## How to Use

### Prerequisites

*   Node.js installed
*   `@google/genai` package installed (`npm install @google/genai`)
*   `GEMINI_API_KEY` environment variable set with your Google AI API key.

### API Endpoint

This controller is typically exposed through an Express.js route. Assuming a route like `/api/advisor/get-advice`, the endpoint would be:

```bash
GET /api/advisor/get-advice
```

**Request:**

*   Requires user authentication (e.g., JWT in headers) to access `req.user.userId`.

**Response (Success):**

```json
{
  "advice": "A concise, actionable financial tip from FinBot."
}
```

**Response (Error):**

```json
{
  "advice": "I'm having a little trouble analyzing your data right now. Please try again in a few minutes, but keep tracking those expenses!"
}
```

## Technologies Used

*   **Node.js**: JavaScript runtime environment.
*   **JavaScript**: Programming language.
*   **@google/genai**: Google's Generative AI SDK for Node.js.
*   **Express.js** (Assumed): Web application framework for routing and handling requests.
*   **Mongoose** (Assumed): ODM for MongoDB, used for `Transaction` and `Budget` models.

## Architecture or Code Overview

The `AdvisorAI` controller performs the following key steps:

1.  **Initialization**:
    *   Retrieves the `GEMINI_API_KEY` from environment variables.
    *   Initializes the `GoogleGenerativeAI` client.
    *   Selects the Gemini model (`gemini-2.5-flash` or `gemini-2.5-pro`).

2.  **Data Fetching and Aggregation**:
    *   Fetches all transactions for the logged-in user.
    *   Filters transactions for the current and previous month.
    *   Fetches the user's budget document.
    *   Calculates total income, total expenses, and net balance.
    *   Aggregates expenses by category.
    *   Determines budget utilization percentage.
    *   Identifies the top 3 spending categories.

3.  **AI Prompt Construction**:
    *   Defines a `systemPrompt` to instruct the AI on its persona ("FinBot"), tone, and output format.
    *   Constructs a `userStats` string containing the aggregated financial data and recent transactions.

4.  **AI Response Generation**:
    *   Calls `model.generateContent` with the system prompt and user statistics.
    *   Sets a `temperature` for controlling creativity/determinism in the AI's response.

5.  **Response Handling**:
    *   Extracts the generated text advice from the AI response.
    *   Sends the advice back to the client as JSON.
    *   Includes error handling for missing API keys, AI service issues, or empty AI responses.

## Known Issues / Improvements

*   **Error Handling**: The current error message for the client is generic. More specific error messages could be provided to the client if appropriate, or logged more granularly.
*   **Data Freshness**: Assumes transactions and budgets are up-to-date. For real-time advice, ensuring data consistency is crucial.
*   **Prompt Engineering**: The prompt can be further refined to elicit more specific or tailored advice.
*   **AI Model Choice**: The choice between `gemini-2.5-flash` and `gemini-2.5-pro` can impact cost and quality; this could be made configurable or dynamically chosen.
*   **Transaction Filtering**: Currently filters transactions by date for current/last month, but the AI prompt uses *all* transactions to calculate totals. Clarify if AI should consider *only* recent transactions or historical data for advice.
*   **No Budget Scenario**: Handles a missing budget by setting `budgetAmount` to 0 and `budgetUsage` to 0%. Could offer advice on *setting* a budget.

## Additional Notes or References

*   **Gemini API Documentation**: [https://ai.google.dev/models/gemini](https://ai.google.dev/models/gemini)
*   **Authentication**: This controller assumes user authentication is handled upstream (e.g., via middleware setting `req.user`).