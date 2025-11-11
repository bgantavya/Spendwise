const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    amount: { type: Number, required: true, default: 0 }
});
module.exports = mongoose.model('Budget', budgetSchema);