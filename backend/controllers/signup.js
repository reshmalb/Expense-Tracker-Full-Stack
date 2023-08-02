const path=require('path');
const Signup= require('../models/signup');
const { error } = require('console');

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
exports.userSignin=((req,res,next)=>{
    const username= req.body.username;
    const password=req.body.password;
    Signup.findAll({
        where:{
            username:username,       
            password:password
        }
        
    })
    .then((result)=>{
        console.log("result",result[0]);
        res.json({
            message:" Login successfull",         

        })
    })
    .catch((error)=>{
        console.log(error)
    })
})
exports.checkUsername=(req,res,next)=>{
    const username=req.params.username;
    Signup.findByPk(username)
    .then((result)=>{
        console.log("pk>>>>>.",result);
        res.json({
            message:"success ",
            data:result

        })
    })
    .catch(error=>{
        console.log(error);

    })
}