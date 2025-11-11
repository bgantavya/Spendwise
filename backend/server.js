const express = require('express');
const cors = require('cors');
const path = require('path');

//db connect
const connectdb = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://frontend-sgi3.onrender.com' : 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
const authenticateToken = require('./middleware/auth.middleware');

const { VerifyUser, SignIn, SignUp } = require('./controllers/auth.controllers');
const { GetTransaction, AddTransaction, DeleteOneT, DeleteManyT } = require('./controllers/transaction.controllers');
const AdvisorAI = require('./controllers/advisor.controllers');
const { GetBudget, SetBudget } = require('./controllers/budget.controllers');


// Routes
app.post('/api/register', SignUp);
app.post('/api/login', SignIn);
app.get('/api/auth_status', authenticateToken, VerifyUser);

app.get('/api/transactions', authenticateToken, GetTransaction);
app.post('/api/transactions', authenticateToken, AddTransaction);
app.delete('/api/transactions/:id', authenticateToken, DeleteOneT);
app.delete('/api/transactions', authenticateToken, DeleteManyT);

app.get('/api/budget', authenticateToken, GetBudget);
app.post('/api/budget', authenticateToken, SetBudget);

// --- AI Coach Route ---
app.get('/api/coach', authenticateToken, AdvisorAI);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Serve the frontend in production
if (process.env.NODE_ENV === 'production') {
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send("API is running...");
    });
}

app.listen(PORT, ()=>{
    connectdb()
    console.log(`Server running on http://localhost:${PORT}`);
});


