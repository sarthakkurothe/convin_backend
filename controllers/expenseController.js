const Expense = require('../models/expenseModel');
const { validateSplit } = require('../utils/validators');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');

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
    try {
        const expenses = await Expense.find();

        // Calculate balances for each participant
        const balances = {};

        expenses.forEach(expense => {
            const totalAmount = expense.amount;
            const numParticipants = expense.participants.length;
            const splitAmount = totalAmount / numParticipants;

            expense.participants.forEach(participant => {
                const userId = participant.user.toString();
                if (!balances[userId]) {
                    balances[userId] = { owed: 0, paid: 0 };
                }

                // Add what the participant owes
                balances[userId].owed += splitAmount;

                // Add what the participant has paid if they are the payer
                if (expense.createdBy.toString() === userId) {
                    balances[userId].paid += totalAmount;
                }
            });
        });

        // Prepare data for CSV
        const csvData = Object.keys(balances).map(userId => ({
            userId,
            totalPaid: balances[userId].paid.toFixed(2),
            totalOwed: balances[userId].owed.toFixed(2),
            balance: (balances[userId].paid - balances[userId].owed).toFixed(2),
        }));

        // Create CSV Writer
        const csvWriter = createCsvWriter({
            path: path.join(__dirname, '../downloads/balanceSheet.csv'),
            header: [
                { id: 'userId', title: 'User ID' },
                { id: 'totalPaid', title: 'Total Paid' },
                { id: 'totalOwed', title: 'Total Owed' },
                { id: 'balance', title: 'Balance' }
            ]
        });

        // Write to CSV
        await csvWriter.writeRecords(csvData);

        // Send CSV file as a response
        res.download(path.join(__dirname, '../downloads/balanceSheet.csv'), 'balanceSheet.csv', err => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Could not download the balance sheet' });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while generating the balance sheet' });
    }
};
