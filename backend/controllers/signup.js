const path = require("path");
const Signup = require("../models/signup");
const bcrypt = require("bcryptjs");
const { SequelizeUniqueConstraintError } = require("sequelize");

exports.userSignup = async (req, res, next) => {
	try {
		const username = req.body.username;
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		console.log(username, name, email, password);
		/*Check whether usernme already exists */
		const existingUser = await Signup.findAll({
			where: {
				username: username,
			},
		});
		/* If Exists */
		if (existingUser.length === 0) {
			
			const saltrounds = 10;
			bcrypt.hash(password, saltrounds, async (err, hashpass) => {
				console.log(hashpass);
				const user = await Signup.create({
					username: username,
					name: name,
					email: email,
					password: hashpass,
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
                return res.status(500).json(error)          
	}
};

exports.userSignin = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await Signup.findAll({
			where: {
				username: username,
			},
		});
		if (user.length > 0) {

			bcrypt.compare(password, user[0].password, (error, result) => {
				if (error) {
					throw new Error("Internal Error");
				}
				if (result === true) {
					return res.status(200).json({
						success: true,
						message: "User Logged in successfully",
					});
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
		return res.status(500).json({
			success: false,
			message: error,
		});
	}
};

