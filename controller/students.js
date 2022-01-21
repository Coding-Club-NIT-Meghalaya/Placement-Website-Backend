const Student=require('../models/Student');

exports.getStudents=async (req,res,next)=>{
    try{
        const student_data=await Student.find();
        res.status(200)
        .json({"success":true,"data":student_data});
    }
    catch(err){
        res.status(400)
        .json({"success":false})
    }  
} 


exports.getStudent=async (req,res,next)=>{
    try{
        const student_data=await Student.findById(req.params.id);
        res.status(200)
        .json({"success":true,"data":student_data});
    }
    catch(err){
        res.status(400)
        .json({"success":false})
    }  
} 



exports.createStudent=async (req,res,next)=>{
    try{
        const student_data=await Student.create(req.body);
        res.status(201)
        .json({"success":true,"data":student_data});
    }
    catch(err){
        res.status(400).json({"success":false})
    }
} 



exports.updateStudent=async (req,res,next)=>{
    try{
        const student_data=await Student.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        if(!student_data){
            res.status(400)
            .json({"success":false,"msg":"Here"});
        }
        res.status(200)
        .json({"success":true,"data":student_data});
    }
    catch(err){
        res.status(400)
        .json({"success":false,"msg":err});
    }
} 



exports.deleteStudent=async (req,res,next)=>{
    try{
        const student_data=await Student.findByIdAndDelete(req.params.id,{
            new:true,
            runValidators:true
        });
        if(!student_data){
            res.status(400)
            .json({"success":false});
        }
        res.status(203)
        .json({"success":true,"data":student_data});
    }
    catch(err){
        res.status(400)
        .json({"success":false});
    }
} 

