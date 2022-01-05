const express = require('express');
const dotenv = require('dotenv');

// Load env file
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Hi there !!");
});

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));