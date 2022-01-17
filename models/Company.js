const mongoose=require('mongoose');

const CompanySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Company should have a name"],
        unique:false,
        maxlength:[50,"Company name can not be greater than 50 characters"]
    },
    domain:{
        type:String,
        unique:false,
        required:[true,'Company should have its domain'],
        maxlength:[20,'Domain name can not have greater than 20 characters'] //Like: IT,Core ,PSU etc
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    photo:{
        type:String,
        default:"no-photo.jpg"
    }
});

module.exports=mongoose.model("Company",CompanySchema);