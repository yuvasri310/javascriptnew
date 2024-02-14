const mongoose=require("mongoose")

const userSchema =new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true                                          //without this field it can't execute,shows error
    },
    email:{
        type:String,
        require:true,
        unique:true                                           //if repeats the data is not added in mongodb ,duplicate

    }
},{versionKey:false})                                         //version will not show in data field

const Users=mongoose.model('userDetails',userSchema)

module.exports={Users}