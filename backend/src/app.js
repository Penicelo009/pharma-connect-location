const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const apiVersion = require('./middleware/apiVersion');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Add API version header middleware (X-API-Version)
app.use(apiVersion);

app.use('/api', routes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

module.exports = app;
