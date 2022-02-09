const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

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
    enum: ['admin', 'tnp_coordinator', 'user', 'sub_admin','publisher'],
    default:'user',
    required: true,
    maxlength: [20, 'User should have a Role'], // Like : Admin , Sub Admin , User etc.
  },
  resetPasswordToken:String,
  resetPasswordExpire: Date,
  createdAt:{
    type:Date,
    default:Date.now
  }
});

// To encrypt the password
UserSchema.pre('save',async function(next){
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt);
});

UserSchema.methods.getSignedJwtToken=function(){
   return jwt.sign({id:this._id},process.env.JWT_SECRET,{
     expiresIn:process.env.JWT_EXPIRE
    });
}

// Hash pasword match
UserSchema.methods.matchPassword=async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model('User', UserSchema);
