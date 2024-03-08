// routes/transactions.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Index Route
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: 'desc' }).exec();
    res.render('index', { transactions: transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// New Route
router.get('/new', (req, res) => {
  res.render('new');
});

// Create Route
router.post('/', async (req, res) => {
  const transaction = new Transaction({
    title: req.body.title,
    amount: req.body.amount,
    date: req.body.date
  });
  try {
    await transaction.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete Route
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.redirect('/transactions');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
