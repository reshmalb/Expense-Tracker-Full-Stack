const path = require("path");
const Expense = require("../models/expense");
const bcrypt = require("bcryptjs");

exports.createExpense= async(req,res,next)=>{
    const {amount,description,category}= req.body;
    
    try{
        const expense= await Expense.create(
            {
                amount,
                description,category
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

exports.retrieveAllExpenseData=async(req,res,next)=>{
    try{
        const expenseList=await  Expense.findAll({
            where :{
                username:req.body.username
            }
        })

        if(expenseList){
            return res.json({
                message:"success",
                success:true,
                data:expenseList
            })
        }

    }
    catch(error){
        console.log(error);
    }

}