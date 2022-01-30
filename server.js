const express = require('express');
const dotenv = require('dotenv');
const erroHandler=require('./middleware/error');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// Load route files

const students = require('./routes/students');

// Load env file
dotenv.config({ path: './config/config.env' });

// Connect to Mongodb Database
if(process.env.NODE_ENV!='test'){
  connectDB();
}


const app = express();

// Body Parser
app.use(express.json());

// logger middleware to log request details using morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes

app.use('/api/v1/students', students);


app.use(erroHandler);

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.status(200).send('Hi there !!');
});

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error:${err.message}`);
  // close server and exit process
  server.close(() => process.exit(1));
});

module.exports=app;