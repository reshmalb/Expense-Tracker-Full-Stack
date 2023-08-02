const path=require('path');
const Signup= require('../models/signup');
const bcrypt = require('bcryptjs')
const { SequelizeUniqueConstraintError } = require('sequelize');

exports.userSignup=(async(req,res,next)=>{
    try{
    // const {username,name,email,password}=req.body;
    const username=req.body.username;
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    console.log(username,name,email,password)


    const existingUser = await Signup.findOne({
        where: {
          username: username,
        },
      });
  
      if (existingUser) {
        return res.status(403).json({
          message: 'User already exists',
          success: false,
        });
      }


    const saltrounds=10;
    bcrypt.hash(password,saltrounds,async (err,hashpass)=>{
        console.log(hashpass);
        
    await Signup.create({
           username: username,
            name:name,
           email: email,
            password:hashpass
        })
       if(err){
        throw new Error(err)
       }
          
            return  res.status(201).json({
             message:" Signed up successfully"
            })
       
        })
    }
    catch(error){
        if (error instanceof SequelizeUniqueConstraintError) {
            // Handle uniqueness constraint violation
            return res.status(403).json({
              message: 'User already exists',
              success: false,
            });
        }
            else{
                return res.status(500).json(error)

            }
    }
})

       
exports.userSignin=(async(req,res,next)=>{
    try{
        const {username,password}=req.body;
        const user=await Signup.findAll({
            where:{
                username:username,
            }           
        })
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(error,result)=>{ 
                if(error){
                   throw new Error('Internal Error') 
                }
                if(result===true){
                    return res.status(200).json({
                        success:true,
                        message:"User Logged in successfully"
                    })
                }
                else{
                    return res.status(400).json({
                        success:false,
                        message:"Incorrect Password"
                    })
                    
                }
            })

        }else{
            return res.status(404).json({
                success:false,
                message:"User Does not exist"
            })

        }
       
           
    
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error
        })

    }
})
   
   
// exports.checkUsername= async(req,res,next)=>{
//     const username=req.params.username;
//    const user=await Signup.findByPk(username);
//    console.log("usercheck",user)
//     if(user !==null){
//         return res.status(403).json({
//             message:"User Already exists ",
//             success:false

//         })
//     }else{
//         return res.status(200).json({
//             success:true,
//             message:"user not available"

//         })
//     }
    
   
// }
