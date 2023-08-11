const express= require('express');
const router=express.Router();
const expense=require('../controllers/expense')
const userauthentication = require('../middlewares/auth')




router.get('/expense/retievedata', userauthentication.authenticate,expense.retrieveAllExpenseData)
router.post('/expense/storedata', userauthentication.authenticate,expense.createExpense)
// router.patch('/expense/updatedata',signup.userSignin)
router.delete('/deletedata/:expenseid',userauthentication.authenticate,expense.deleteexpense)




module.exports =router;