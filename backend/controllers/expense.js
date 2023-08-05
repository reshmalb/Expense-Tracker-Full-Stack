const path = require("path");
const Expense = require("../models/expense");
const bcrypt = require("bcryptjs");

exports.createExpense= async(req,res,next)=>{
    const {amount,description,category}= req.body;
    
    try{
        const expense= await  Expense.create(
            {
                amount,
                description,
                category,
                userId: req.user.id
            }
        )

        return res.status(200).json({
            message:"Data added Successfully."
        })
         

    }
    catch(error){
        console.log(error)
    }

}

exports.retrieveAllExpenseData = async(req,res,next)=>{
    try{
      const expenses= await  Expense.findAll({ where : { userId: req.user.id}})
       if(expenses){
            return res.status(200).json({expenses, success: true})
               
       }         

    }
    catch(error){
        console.log(error);
        return res.status(500).json({ error: error, success: false})
    }

}