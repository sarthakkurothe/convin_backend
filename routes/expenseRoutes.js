const express = require('express');
const { addExpense, getUserExpenses, getAllExpenses, downloadBalanceSheet } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addExpense);
router.get('/user', protect, getUserExpenses);
router.get('/', protect, getAllExpenses);
router.get('/balance-sheet', protect, downloadBalanceSheet);

module.exports = router;
