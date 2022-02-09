const User = require('../models/User');
const ErrorRessponse=require('../utils/errorResponse');
const asyncHandler=require('express-async-handler');

exports.register= asyncHandler(async(req,res,next)=>{
    const {username,password,role,_student,_teacher}=req.body;

    const user=await User.create({
        username,
        password,
        role,
        _student,
        _teacher
    });
   
    sendTokenResponse(user,200,res);
});


exports.login= asyncHandler(async(req,res,next)=>{
    const {username,password}=req.body;

    if(!username||!password){
        return next(new ErrorRessponse('Please enter username and password'),400);
    }

    const user=await User.findOne({username}).select('+password');

    if(!user){
        return next(new ErrorRessponse('Inavlid Credentials'),401);
    }

    const isMatch=await user.matchPassword(password);

    if(!isMatch){
        return next(new ErrorRessponse('Invalid Credential'),401);
    }

    sendTokenResponse(user,200,res);
    
});


const sendTokenResponse=(user,statusCode,res)=>{

    const token=user.getSignedJwtToken();

    const options={
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    };

    res.status(statusCode).cookie('token',token,options).json({
        sucess:true,
        token
    });

};