import axios from 'axios';

// Configuration
export const apiBase =  (
    process.env.NODE_ENV === 'production' 
        ? 'https://fintrack-3d4m.onrender.com' // Empty string for same-origin requests in production
        : 'http://localhost:8000'
);

// Create Axios instance with default config
const apiClient = axios.create({
    baseURL: apiBase,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable sending cookies in cross-origin requests
    // Optional: timeout after 10 seconds
    timeout: 10000,
});

// --- TOKEN MANAGEMENT ---
export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}

// --- AXIOS INTERCEPTORS ---

// 1. Request Interceptor: Auto-attach token
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        // If token exists, attach it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. Response Interceptor: Centralized error handling and data extraction
apiClient.interceptors.response.use(
    (response) => {
        // Return just the data to simplify calls in components
        return response.data;
    },
    (error) => {
        // Handle standard HTTP errors
        let errorMessage = 'An unexpected error occurred.';

        if (error.response) {
            // Server responded with a status code outside the 2xx range
            // Try to get the specific error message sent by the server (e.g., res.status(400).send("Invalid password"))
            errorMessage = error.response.data?.message || error.response.data || error.response.statusText;

            // Optional: Handle specific status codes globally (e.g., auto-logout on 401)
            if (error.response.status === 401) {
                // setToken(null); 
                // window.location.href = '/login';
            }
        } else if (error.request) {
            // The request was made but no response was received (network error, server down)
            errorMessage = 'Network error. Please check your connection.';
        } else {
            // Something happened in setting up the request
            errorMessage = error.message;
        }

        // Reject the promise with a clean error object or string
        // We throw an Error object so components can catch it easily: catch (err) { setText(err.message) }
        return Promise.reject(new Error(errorMessage));
    }
);

// --- API METHODS ---

// Auth
export function login(username, password) {
    return apiClient.post('/api/login', { username, password });
}

export function register(firstName, lastName, email, username, password) {
    return apiClient.post('/api/register', { 
        firstName, 
        lastName, 
        email, 
        username, 
        password 
    });
}

export function fetchAuthStatus() {
    return apiClient.get('/api/auth_status');
}

// Transactions
export function fetchTransactions() {
    return apiClient.get('/api/transactions');
}

export function addTransaction(payload) {
    // payload = { description, amount, type, category }
    return apiClient.post('/api/transactions', payload);
}

export function deleteTransaction(id) {
    return apiClient.delete(`/api/transactions/${id}`);
}

export function resetTransactions() {
    return apiClient.delete('/api/transactions/reset');
}

// Budget
export function fetchBudget() {
    return apiClient.get('/api/budget');
}

export function setBudget(amount) {
    return apiClient.post('/api/budget', { amount });
}

export function AdivisorAI() {
    return apiClient.get('/api/coach');
}