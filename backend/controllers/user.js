const path = require("path");
const  User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')


function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}
const userSignup = async (req, res, next) => {
	try {
	
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		console.log( name, email, password);
		/*Check whether usernme already exists */
		const existingUser = await User.findAll({
			where: {
				email: email,
			},
		});
		/* If Exists */
		if (existingUser.length === 0) {			
			const saltrounds = 10;
			bcrypt.hash(password, saltrounds, async (err, hashpass) => {
				const user = await User.create({
					name, email, password: hashpass, ispremiumuser: false,totalexpense: 0
				});

                console.log("new user------->",user)
                if(err){
                    throw new Error("Something went wrong...")
                }
                return  res.status(200).json({
                    message:" Signed up successfully"
             })

                

			});
		} else {
			return res.status(403).json({
				message: "User already exists",
				success: false,
			});
		}	
	} catch (error) {	 
		console.log(error)        
                return res.status(500).json(error)          
	}
};

const generateAccessToken = (id, name,ispremiumuser) => {
    return jwt.sign({ userId : id, name: name,ispremiumuser} ,'secretkey');
}

const userSignin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if(isstringinvalid(email)  || isstringinvalid(password)){
			return res.status(400).json({err: "Bad parameters . Something is missing"})
		}
		const user = await User.findAll({
			where: {
				email: email,
			},
		});
		if (user.length > 0) {
			console.log("lenghth:",user.length);

			bcrypt.compare(password, user[0].password, (error, result) => {
				if (error) {
					throw new Error("Internal Error");
				}
				if (result === true) {
					console.log(result)

					return res.status(200).json(
						{success: true, 
						message: "User logged in successfully",
					    token: generateAccessToken(user[0].id, user[0].name,user[0].ispremiumuser)})
					// return res.status(200).json({
					// 	success: true,
					// 	message: "User Logged in successfully",
					// });
				} else {
					return res.status(400).json({
						success: false,
						message: "Incorrect Password",
					});
				}
			});
		} else {
			return res.status(404).json({
				success: false,
				message: "User Does not exist",
			});
		}
	} catch (error) {
		console.log("ERROR",error);
		return res.status(500).json({
			success: false,
			message: error,
		});
	}
};

module.exports={
	generateAccessToken,
	userSignin,
	userSignup

}