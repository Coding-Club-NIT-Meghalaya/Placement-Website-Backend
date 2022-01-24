const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CompensationSchema = new mongoose.Schema({
  _company: { type: Schema.Types.ObjectId, ref: 'Company' },
  role: {
    type: String,
    required: [true, 'Placement should have a role'],
    maxlength: [20, 'Placement cannot have greater than 20 characters'], // LIke : SDE ,SRE ,SWE , MTS etc.
  },
  ctc: {
    type: String,
    required: [true, 'Placement Should have CTC'],
    unique: false,
    maxlength: [20, 'CTC can not have greater than 20 characters'],
  },
  base: {
    type: String,
    required: [true, 'Placement should have base salary'],
    unique: false,
    maxlength: [20, 'Base cannot have greater than 20 characters'],
  },
  esops: {
    type: String,
    required: false,
    unique: false,
    maxlength: [20, 'Esops can not have greater than 20 characters'],
  },
  rsus: {
    type: String,
    required: false,
    unique: false,
    maxlength: [20, 'Rsus can not have greater than 20 characters'],
  },
});

module.exports = mongoose.model('Compensation', CompensationSchema);
