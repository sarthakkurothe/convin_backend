const Expense = require('../models/expenseModel');
const { validateSplit } = require('../utils/validators');

// Add Expense
exports.addExpense = async (req, res) => {
    const { title, amount, splitMethod, splitDetails, participants } = req.body;

    if (!validateSplit(splitMethod, amount, splitDetails)) {
        return res.status(400).json({ message: 'Invalid split details' });
    }

    const expense = new Expense({
        title,
        amount,
        splitMethod,
        splitDetails,
        participants,
        createdBy: req.user._id,
    });

    await expense.save();

    res.status(201).json(expense);
};

// Get User Expenses
exports.getUserExpenses = async (req, res) => {
    const expenses = await Expense.find({ participants: req.user._id });
    res.json(expenses);
};

// Get All Expenses
exports.getAllExpenses = async (req, res) => {
    const expenses = await Expense.find().populate('createdBy', 'name');
    res.json(expenses);
};

// Download Balance Sheet
exports.downloadBalanceSheet = async (req, res) => {
    // Implement balance sheet generator (e.g., CSV or PDF)
};
