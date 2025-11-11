const Budget = require('../models/budget.models');

const GetBudget = async (req, res) => {
    try {
        // FIX: Use req.user.userId
        const budget = await Budget.findOne({ userId: req.user.userId });
        if (!budget) {
            return res.json({ amount: 0 });
        }
        res.json(budget);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const SetBudget = async (req, res) => {
    const { amount } = req.body;
    try {
        const budget = await Budget.findOneAndUpdate(
            { userId: req.user.userId },
            { amount: amount },
            { new: true, upsert: true }
        );
        res.json(budget);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { GetBudget, SetBudget };