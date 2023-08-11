const path = require("path");
const  User = require("../models/user");
const Sib= require('sib-api-v3-sdk');
require('dotenv').config();




const changepassword= async(req,res,next)=>{
    const {email}= req.body;

    try{
       const user = await User.findOne({where:{email:email}})
        if(!user){
            return res.status(404).json({
				success: false,
				message: "User Does not exist",
			});
        }
        else{

                 const client= Sib.ApiClient.instance;
                 const api_key= client.authentications['api-key'];
                 api_key.api_key = process.env.API_KEY;

                 const transEmailApi= new Sib.TransactionalEmailsApi();
                 const sender={
                    email :'reshma.lb27@gmail.com'
                 }
                  const receivers= [{
                    email:  email
                  }]
                  
                 transEmailApi.sendTransacEmail({
                    sender,
                    to:receivers,
                    subject: "Change password confirmation email",
                    textContent:"Click here"
                  }).then((result)=>
                    console.log("ReSULT>>>>>>",result)
                  ).catch((error)=>{
                    console.log("error>>>>>>",error)

                  })
                  
                    // return res.status(200).json({
                    //     message:"verification mail send"
                    // })
               

        }

    }catch(error){
console.log(error)
    }

     


}

module.exports={
    changepassword
}