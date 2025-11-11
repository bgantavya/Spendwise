const Transaction = require('../models/transaction.models');

const GetTransaction = async (req, res) => {
    try {
        const transactions = await Transaction
        .find({ userId: req.user.userId })
        .sort({ timestamp: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500)
        .json({ message: 'Server error: ' + err.message });
    }
};

const AddTransaction = async (req, res) => {
    try {
        const { description, amount, type, category } = req.body;
        const newTransaction = new Transaction({
            userId: req.user.userId,
            description,
            amount,
            type,
            category
        });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: 'Error adding transaction: ' + err.message });
    }
};

const DeleteOneT = async (req, res) => {
    try {
        // FIX: Use req.user.userId
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const DeleteManyT = async (req, res) => {
    try {
        await Transaction.deleteMany({ userId: req.user.userId });
        res.json({ message: 'All transactions have been deleted.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error while resetting transactions.' });
    }
};

module.exports = { GetTransaction, AddTransaction, DeleteOneT, DeleteManyT };