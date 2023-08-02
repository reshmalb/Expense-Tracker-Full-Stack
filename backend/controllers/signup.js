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
    .then((user)=>{
        console.log("user.......................",user)
        const data= ( user === []? null:user);

        if (data===null) {
            // User not found in the database
        console.log("data.......................",data)

            return res.status(401).json({
              message: "User not authorized",
              data:null
            });
          }
          else{
            res.json({
                message:"login successfull",
                data:user
            })
          }
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
