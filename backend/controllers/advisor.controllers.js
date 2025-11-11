const GoogleGenAI = require('@google/genai')
const Transaction = require('../models/transaction.models');
const Budget = require('../models/budget.models');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const AdvisorAI = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing in environment variables.');
      return res.status(500).json({ message: 'AI service not configured.' });
    }

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // or "gemini-2.5-pro"

    // 1. Fetch and aggregate financial data
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const transactions = await Transaction.find({ userId: req.user.userId }).sort({ timestamp: -1 });
    const thisMonthTransactions = transactions.filter(t => new Date(t.timestamp) >= firstDayThisMonth);
    const lastMonthTransactions = transactions.filter(
      t => new Date(t.timestamp) >= firstDayLastMonth && new Date(t.timestamp) < firstDayThisMonth
    );

    const budgetDoc = await Budget.findOne({ userId: req.user.userId });
    const budgetAmount = budgetDoc ? budgetDoc.amount : 0;

    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryTotals = {};

    transactions.forEach(t => {
      if (t.type === 'income') totalIncome += t.amount;
      else {
        totalExpenses += t.amount;
        const cat = t.category || 'other';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + t.amount;
      }
    });

    const balance = totalIncome - totalExpenses;
    const budgetUsage = budgetAmount > 0 ? ((totalExpenses / budgetAmount) * 100).toFixed(1) : 0;

    const topCategories = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat, amount]) => `${cat} (₹${amount})`)
      .join(', ');

    // 2. Create AI prompt
    const systemPrompt = `
You are "FinBot", a friendly, encouraging, and highly practical personal finance coach.
Tone: Supportive, non-judgmental, yet direct about overspending.
Output Rules:
- Keep it short (max 3-4 sentences).
- Provide ONE specific, actionable tip based on their data.
- Use Rupee symbol (₹) for currency.
`;

    const userStats = `
Analyze my current financial status and give me advice:
- Total Income: ₹${totalIncome}
- Total Expenses: ₹${totalExpenses}
- Net Balance: ₹${balance}
- Monthly Budget Goal: ${budgetAmount > 0 ? '₹' + budgetAmount : 'Not set'}
- Budget Used: ${budgetUsage}%
- Top Spending Categories: ${topCategories || 'None yet'}
- Recent 5 Transactions: ${JSON.stringify(
        transactions.slice(0, 5).map(t => `${t.description} (₹${t.amount})`)
      )}
`;
    // 3. Generate AI advice
    const result = await model.generateContent({
      systemInstruction: systemPrompt,
      contents: [{ role: 'user', parts: [{ text: userStats }] }],
      generationConfig: {
        temperature: 0.7,
      },
    });
    const advice = await result.response.text();
    // categoryTotals
    if (!advice) throw new Error('Empty response from AI.');
    res.json({ advice: advice.trim() });

  } catch (err) {
    console.error('AdvisorAI Controller Error:', err.message);
    res.json({
      advice: "I'm having a little trouble analyzing your data right now. Please try again in a few minutes, but keep tracking those expenses!",
    });
  }
};

module.exports = AdvisorAI;
