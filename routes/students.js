const express=require('express');

const {getStudents,getStudent,createStudent,updateStudent,deleteStudent}=require('../controller/students');
const router=express.Router();

router.route('/').get(getStudents).post(createStudent);

router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent);



module.exports=router;