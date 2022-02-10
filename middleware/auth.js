const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');
const ErrorRessponse=require('../utils/errorResponse');
const User=require('../models/User');


exports.protect=asyncHandler(async(req,res,next)=>{
   let token;
   if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
       token=req.headers.authorization.split(' ')[1]
   }
   else if(req.cookies.token){
       token=req.cookies.token;
   }
   console.log(token);


   if(!token){
       return next(new ErrorRessponse('Not authorize to access the route',401));
   }

   try{
       const decoded=jwt.verify(token,process.env.JWT_SECRET);

       req.user=await User.findById(decoded.id);
       next();
   }
   catch{
    return next(new ErrorRessponse('Not authorize to access the route',401));
   }
});

exports.authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorRessponse(`User role '${req.user.role}' is not authorize to access the route`),403);
        } 
        next();
    }
}