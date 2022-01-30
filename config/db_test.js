const mongoose=require('mongoose');
const Mockgoose=require('mockgoose').Mockgoose;
const mockgoose=new Mockgoose(mongoose);

function connect(){
    return new Promise((resolve,reject)=>{
        mockgoose.prepareStorage().then(()=>{
            mongoose.connect(process.env.MONGO_URI,{
                useNewUrlParser:true
            }).then((res,err)=>{
                if(err) return reject(err);
                console.log("Connected in Test Mode");
                resolve();
            })
        })
    })
}


function close(){
    return mongoose.disconnect();
}

module.exports={connect,close};


