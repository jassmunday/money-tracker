// routes/index.js
const express = require('express');
const router = express.Router();

// Root Route
router.get('/', (req, res) => {
  res.redirect('/transactions'); // Redirect to transactions route
});

module.exports = router;
