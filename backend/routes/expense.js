const express= require('express');
const router=express.Router();
const expense=require('../controllers/expense')


// router.get('/user/:username',signup.checkUsername)

router.get('/expense/retievedata',expense.retrieveAllExpenseData)
router.post('/expense/storedata',expense.createExpense)
// router.patch('/expense/updatedata',signup.userSignin)
// router.delete('/expense/deletedata',signup.userSignin)




module.exports =router;