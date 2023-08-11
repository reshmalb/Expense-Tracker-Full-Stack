const express= require('express');
const router=express.Router();
const password =require('../controllers/passord')


router.post('/password/forgotpassword', password.changepassword)



module.exports = router;