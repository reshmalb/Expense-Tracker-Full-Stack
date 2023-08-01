const path=require('path');
const Signup= require('../models/signup')

exports.userSignup=((req,res,next)=>{
    const username= req.body.username;
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    Signup.create({
        username:username,
        name:name,
        email:email,
        password:password
    })
    .then((result)=>{
        res.json({
            message:" Signed up successfully"
        })
    })
    .catch((error)=>{
        console.log(error)
    })
})