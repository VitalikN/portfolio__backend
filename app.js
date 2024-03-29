const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

const portfolioRouter = require('./routes/api/portfolio');
const adminRouter = require('./routes/api/admin');
const authRouter = require('./routes/api/auth');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/portfolio', portfolioRouter);
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server  error' } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
