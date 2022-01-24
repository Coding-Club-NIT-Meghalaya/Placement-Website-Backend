const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: false,
    trim: true,
    maxlength: [60, 'Name can not be more than 60 characters'],
  },
  rollNo: {
    type: String,
    required: [true, 'Please add a Roll No'],
    unique: true,
    maxlength: [12, 'Roll Number can not be more than 12 characters'],
  },
  email: {
    type: String,
    required: [true, 'PLease add a email address'],
    unique: false,
    maxlength: [50, 'Email Should not be greater than 50 characters'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please add a valid email',
    ],
  },
  passoutYear: {
    type: Number,
    required: [true, 'Student should have passout year'],
    unique: false,
  },
  phone: {
    type: String,
    required: false,
    unique: false,
    maxlength: [20, 'Phone Number Should not be greater than 20'],
  },
  branch: {
    type: String,
    required: false,
    unique: false,
    maxlength: [30, 'Branch name cannot be greater than 30 characters'],
  },
  currentCompany: {
    type: String,
    require: false,
    unique: false,
    default: null,
    maxlength: [50, 'Company name can not be greater than 50 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
});

module.exports = mongoose.model('Student', StudentSchema);
