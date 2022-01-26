const Student = require('../models/Student');
const ErrorRessponse=require('../utils/errorResponse');

exports.getStudents = async (req, res, next) => {
  try {
    const student_data = await Student.find();
    res.status(200)
      .json({ success: true, data: student_data });
  } catch (err) {
    next(err);
  }
};

exports.getStudent = async (req, res, next) => {
  try {
    const student_data = await Student.findById(req.params.id);
    res.status(200)
      .json({ success: true, data: student_data });
  } catch (err) {
       next(err);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const student_data = await Student.create(req.body);
    res.status(201)
      .json({ success: true, data: student_data });
  } catch (err) {
       next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const student_data = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student_data) {
       return next(new ErrorRessponse(`Student not found with id ${req.params.id}`,404));
    }
    res.status(200)
      .json({ success: true, data: student_data });
  } catch (err) {
    next(err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const student_data = await Student.findByIdAndDelete(req.params.id, {
      new: true,
      runValidators: true,
    });
    if (!student_data) {
      return next(new ErrorRessponse(`Student not found with id ${req.params.id}`,404));
    }
    res.status(203)
      .json({ success: true, data: student_data });
  } catch (err) {
    next(err);
  }
};
