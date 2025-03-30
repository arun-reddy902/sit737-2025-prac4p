// Importing necessary libraries
const express = require('express');
const winston = require('winston');

// Initialize Express app
const app = express();

// Setup Winston logger
const logger = winston.createLogger({
    level: 'info', // Log level set to 'info'
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Error logs
        new winston.transports.File({ filename: 'logs/combined.log' }) // Combined logs
    ]
});

// Define routes for arithmetic operations

// Addition Route
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input: Non-numeric input provided');
        return res.status(400).send('Invalid input');
    }

    const result = num1 + num2;
    logger.info(`New addition operation requested: ${num1} + ${num2}`);
    res.send(`Result: ${result}`);
});

// Subtraction Route
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input: Non-numeric input provided');
        return res.status(400).send('Invalid input');
    }

    const result = num1 - num2;
    logger.info(`New subtraction operation requested: ${num1} - ${num2}`);
    res.send(`Result: ${result}`);
});

// Multiplication Route
app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input: Non-numeric input provided');
        return res.status(400).send('Invalid input');
    }

    const result = num1 * num2;
    logger.info(`New multiplication operation requested: ${num1} * ${num2}`);
    res.send(`Result: ${result}`);
});

// Division Route
app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input: Non-numeric input provided');
        return res.status(400).send('Invalid input');
    }

    if (num2 === 0) {
        logger.error('Invalid operation: Division by zero');
        return res.status(400).send('Cannot divide by zero');
    }

    const result = num1 / num2;
    logger.info(`New division operation requested: ${num1} / ${num2}`);
    res.send(`Result: ${result}`);
});

// Exponentiation Route
app.get('/power', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input: Non-numeric input provided');
        return res.status(400).send('Invalid input');
    }

    const result = Math.pow(num1, num2);
    logger.info(`New exponentiation operation requested: ${num1} ^ ${num2}`);
    res.send(`Result: ${result}`);
});

// Square Root Route
app.get('/sqrt', (req, res) => {
    const num = parseFloat(req.query.num);

    if (isNaN(num) || num < 0) {
        logger.error('Invalid input: Negative number for square root');
        return res.status(400).send('Cannot calculate square root of a negative number');
    }

    const result = Math.sqrt(num);
    logger.info(`New square root operation requested: sqrt(${num})`);
    res.send(`Result: ${result}`);
});

// Modulo Route
app.get('/mod', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input: Non-numeric input provided');
        return res.status(400).send('Invalid input');
    }

    const result = num1 % num2;
    logger.info(`New modulo operation requested: ${num1} % ${num2}`);
    res.send(`Result: ${result}`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Calculator microservice running on port ${PORT}`);
});
