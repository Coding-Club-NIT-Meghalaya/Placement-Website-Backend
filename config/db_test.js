const mongoose=require('mongoose');
const Mockgoose=require('mockgoose').Mockgoose;
const mockgoose=new Mockgoose(mongoose);

function connect(){
    return new Promise((resolve,reject)=>{
            mongoose.connect('mongodb://localhost:27017/placement-website-test',{
                useNewUrlParser:true,
                useUnifiedTopology:true
            }).then((res,err)=>{
                if(err) return reject(err);
                console.log("Connected in Test Mode");
                resolve();
            })
        })
}


async function close(){
    const drop =await mongoose.connection.db.dropDatabase();
    return mongoose.disconnect();
}

module.exports={connect,close};


