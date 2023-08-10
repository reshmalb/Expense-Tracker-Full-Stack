const path = require("path");
const Expense = require("../models/expense");
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const { DOUBLE } = require("sequelize");
const { trace } = require("console");
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// exports.createExpense= async(req,res,next)=>{
//     const t = await sequelize.transaction();
//     const {expenseamount,description,category}= req.body;
//     console.log(expenseamount,description,category)
//     const userid=req.user.id;
    
//     try{
//         const promise1= await  Expense.create(
//             {
//                expenseamount,
//                 description,
//                 category,
//                 userId: userid
//             },{ transaction : t}
//         )
       
//         try{
//             const totalexpenses= Number.parseFloat(req.user.totalesense) +Number.parseFloat(expenseamount)
//             const promise2= await User.update({totalexpense :totalexpenses},
//                 {where:{id:userid}},
//                 {transaction :t })
//                if(promise2) {
//                 await t.commit();
//                 return res.status(200).json({  message:"Data added Successfully."   })

//                }
               

//         }catch (error){
//             await t.rollback();
//             throw new Error(error)
//        }        
//     }
//     catch(error){
//         console.log(error)
//     }

// }

const retrieveAllExpenseData = async(req,res,next)=>{
    try{
      const expenses= await  Expense.findAll({ where : { userId: req.user.id}})
       if(expenses){
          console.log('EXPENSES>>>>>>.',expenses)
            return res.status(200).json({expenses, success: true})               
       }         

    }
    catch(error){
        console.log(error);
    }

}
//  const deleteexpense =async (req, res) => {
//     const t = await sequelize.transaction();
//     const expenseid = req.params.expenseid;
//     if(expenseid == undefined || expenseid.length === 0){
//         return res.status(400).json({success: false, })
//     }
//     try{

//          const expenseData= await  Expense.findOne({where: { id: expenseid  }})

//          const promise1= await Expense.destroy({where: { id: expenseid, userId: req.user.id }},{transsaction:t});
         
          
//             const userData= await  User.findOne({where: { id: req.user.id }})
//             const promise2= userData.update({totalexpense: Number.parseFloat( userData.totalexpense )- Number.parseFloat(expenseData.expenseamount)},{transaction :t})

//              await t.commit();
//              return res.status(200).json({ success: true, message: "Deleted Successfuly"})
             

       
//     }catch(err){
//         t.rollback();
//         console.log(err);
//         return res.status(500).json({ success: true, message: "Failed"})
//     }
 
// }




const createExpense = async (req, res, next) => {
    const { expenseamount, description, category } = req.body;
    const userid = req.user.id;
    const t= await sequelize.transaction();
  
    try {     
        // Create expense
        const createdExpense = await Expense.create(
          {
            expenseamount,
            description,
            category,
            userId: userid,
          },
          { transaction: t }
        );
  
        // Update user's total expenses
        const totalexpenses = parseFloat(req.user.totalexpense) + parseFloat(expenseamount);
        await User.update({ totalexpense: totalexpenses }, { where: { id: userid }, transaction: t });
  
  
      await t.commit();
      res.status(200).json({ message: "Data added successfully."});

    } catch (error) {
      console.error("Error creating expense:", error);
     
        await t.rollback();
    
      res.status(500).json({ message: "An error occurred while creating the expense." });
    }
  };
  








  const deleteexpense = async (req, res) => {
    const t = await sequelize.transaction();
    const expenseid = req.params.expenseid;
  
    if (!expenseid) {
      return res.status(400).json({ success: false, message: "Invalid expense ID" });
    }
  
    try {
      const expenseData = await Expense.findOne({ where: { id: expenseid } });
      if (!expenseData) {
        await t.rollback();
        return res.status(404).json({ success: false, message: "Expense not found" });
      }
  
      await Expense.destroy({ where: { id: expenseid, userId: req.user.id }, transaction: t });
  
      const userData = await User.findOne({ where: { id: req.user.id } });
      const newTotalExpense = parseFloat(userData.totalexpense) - parseFloat(expenseData.expenseamount);
      await userData.update({ totalexpense: newTotalExpense }, { transaction: t });
  
      await t.commit();
      return res.status(200).json({ success: true, message: "Deleted Successfully" });
    } catch (err) {
      await t.rollback();
      console.error(err);
      return res.status(500).json({ success: false, message: "Failed to delete expense" });
    }
  };
  








  // Export the function for use in your application
  module.exports = {
    createExpense,
    deleteexpense,
    retrieveAllExpenseData
  };
  