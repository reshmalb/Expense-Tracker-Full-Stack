const express= require('express');
const router=express.Router();
const signup=require('../controllers/signup')


// router.get('/user/:username',signup.checkUsername)

router.post('/user/signup',signup.userSignup)
router.post('/user/signin',signup.userSignin)


module.exports =router;