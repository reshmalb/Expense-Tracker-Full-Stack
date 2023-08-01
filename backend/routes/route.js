const express= require('express');
const router=express.Router();
const signup=require('../controllers/signup')

router.post('/user/signup',signup.userSignup)

module.exports =router;