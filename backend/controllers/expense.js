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
          console.log('EXPENSES>>>>>>.',expenses)
            return res.status(200).json({expenses, success: true})               
       }         

    }
    catch(error){
        console.log(error);
        return res.status(500).json({ error: error, success: false})
    }

}
exports.deleteexpense =async (req, res) => {
    const expenseid = req.params.expenseid;
    if(expenseid == undefined || expenseid.length === 0){
        return res.status(400).json({success: false, })
    }
    try{

         const result= await Expense.destroy({where: { id: expenseid, userId: req.user.id }});
          if(result===0){
            return res.status(404).json({success: false, message: 'Expense does not belong to the user'})

          }
          return res.status(200).json({ success: true, message: "Deleted Successfuly"})

    }catch(err){
        console.log(err);
        return res.status(500).json({ success: true, message: "Failed"})
    }
 
}