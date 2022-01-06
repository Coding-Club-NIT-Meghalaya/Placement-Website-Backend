const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const colors = require('colors');

// Load env file
dotenv.config({ path: './config/config.env' });

// Connect to Mongodb Database
connectDB();

const app = express();
// logger middleware to log request details using morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Hi there !!");
});

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error:${err.message}`);
    // close server and exit process
    server.close(() => process.exit(1));
});