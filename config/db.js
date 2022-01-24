const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });
  console.log(`Database Connected: ${process.env.MONGO_URI}`.blue.bold);
};

module.exports = connectDB;
