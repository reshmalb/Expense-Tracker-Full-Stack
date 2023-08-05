const express= require('express');
const router=express.Router();
const user=require('../controllers/user')


// router.get('/user/:username',signup.checkUsername)

router.post('/user/signup',user.userSignup)
router.post('/user/signin',user.userSignin)


module.exports =router;