const express = require('express');
const {
  getStudents, getStudent, createStudent, updateStudent, deleteStudent,
} = require('../controller/students');

const {protect,authorize}=require('../middleware/auth');


const router = express.Router();

router.route('/').get(protect,getStudents).post(createStudent);

router.route('/:id').get(protect,getStudent).put(protect,authorize('admin'),updateStudent).delete(protect,authorize('admin'),deleteStudent);

module.exports = router;
