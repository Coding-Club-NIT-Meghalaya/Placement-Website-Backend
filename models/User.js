const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: [20, 'User Name can not be greater than 20 characters'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password cannot be less then 6 character'],
    select: false,
  },
  _teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' }, // References from Teacher table
  _student: { type: Schema.Types.ObjectId, ref: 'Student' }, // References from Student Table
  role: {
    type: String,
    enum: ['admin', 'tnp_cordinator', 'user', 'sub_admin'],
    required: true,
    maxlength: [20, 'User should have a Role'], // Like : Admin , Sub Admin , User etc.
  },
});

module.exports = mongoose.model('User', UserSchema);
