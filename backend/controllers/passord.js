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

                 let defaultClient= Sib.ApiClient.instance;
                 let apiKey= defaultClient.authentications['api-key'];
                 apiKey.apiKey = process.env.API_KEY;

                 let apiInstance= new Sib.TransactionalEmailsApi();
                 let sendSmtpEmail = new Sib.SendSmtpEmail();




                 sendSmtpEmail.subject = "Password Change";
                 sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email </h1></body></html>";
                 sendSmtpEmail.sender = {"name":"Reshma","email":" reshma.lb27@gmail.com"};
                 sendSmtpEmail.to = [{"email":email,"name":"Reshma"}];
                //  sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
                //  sendSmtpEmail.bcc = [{"email":"John Doe","name":"example@example.com"}];
                //  sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
                //  sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
                //  sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};
                apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
                  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
                }, function(error) {
                  console.error(error);
                });














                //  const sender={
                //     email :'reshma.lb27@gmail.com'
                //  }
                //   const receivers= [{
                //     email:  email
                //   }]
                  
                //  transEmailApi.sendTransacEmail({
                //     sender,
                //     to:receivers,
                //     subject: "Change password confirmation email",
                //     textContent:"Click here"
                //   }).then((result)=>
                //     console.log("ReSULT>>>>>>",result)
                //   ).catch((error)=>{
                //     console.log("error>>>>>>",error)

                //   })
                  
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