// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const transactionRoutes = require('./routes/transactions');
const indexRoutes = require('./routes/index');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const user = process.env.USER;
const pswrd = process.env.PSWRD;

mongoose.connect(`mongodb+srv://${user}:${pswrd}@cluster0.0zlgtkf.mongodb.net/trackMoneyDB`)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/', indexRoutes); // Use index routes for the root path
app.use('/transactions', transactionRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
