const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: false,
    trim: true,
    maxlength: [60, 'Name can not be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'PLease add a email address'],
    unique: false,
    maxlength: [50, 'Email Should not be greater than 50 characters'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    required: false,
    unique: false,
    maxlength: [20, 'Phone Number Should not be greater than 20'],
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

module.exports = mongoose.model('Teacher', TeacherSchema);
