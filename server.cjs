const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const {Users}=require('./schema.cjs')

const app=express()
app.use(bodyParser.json())
 
async function collectiontodb(){
    try{
    await mongoose.connect('mongodb+srv://yuvasri_310:yuva125@cluster0.1pu1eh9.mongodb.net/UserDetails?retryWrites=true&w=majority')
    console.log('connection established')
    const port=2000
    app.listen(port,function(){
        console.log(`listening on port ${port}....`)
})
}catch(error){
    console.log(error)
    console.log('cant connect')
}
}
collectiontodb()

app.post('/create-new-user',async function (request,response){
    try {
        await Users.create({
            "userName" : request.body.userName,
            "email" : request.body.email,
            "password" : request.body.password
        })
        response.status(201).json({
        "status" : "success"
        })
   } catch(error) {
        response.status(500).json({
            "status":"failure",
            "message" : "user not created"
        })
   }
})

app.post('/validate-user',async function(request,response){
    try {
        const user=await Users.findOne({
            "email" : request.body.email,
            "password" : request.body.password,
            
        })
        if(user){
        response.status(200).json({
        "message" : "valid user"
        })
   } else {
        response.status(401).json({
            "message":"invalid user"
        })
   }
}catch(error){
    response.status(500).json({
    "message":"internal server error"
     })
  }
})


