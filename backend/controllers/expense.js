const path = require("path");
const Expense = require("../models/expense");
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const { DOUBLE } = require("sequelize");

exports.createExpense= async(req,res,next)=>{
    const {expenseamount,description,category}= req.body;
    console.log(expenseamount,description,category)
    const userid=req.user.id;
    
    try{
        const promise1= await  Expense.create(
            {
               expenseamount,
                description,
                category,
                userId: userid
            }
        )
          const userData= await  User.findOne({where: { id: userid  }})
           const promise2= userData.update({totalexpense: Number.parseFloat( userData.totalexpense) + Number.parseFloat(expenseamount)})

           Promise.all([promise1,promise2])
           .then(()=>{
            return res.status(200).json({  message:"Data added Successfully."   })
           }).catch((error ) => {
                throw new Error(error)
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
        // return res.status(500).json({ error: error, success: false})
    }

}
exports.deleteexpense =async (req, res) => {
    const expenseid = req.params.expenseid;
    if(expenseid == undefined || expenseid.length === 0){
        return res.status(400).json({success: false, })
    }
    try{

         const expenseData= await  Expense.findOne({where: { id: expenseid  }})
         const userData= await  User.findOne({where: { id: req.user.id }})
         const promise1= await Expense.destroy({where: { id: expenseid, userId: req.user.id }});
         const promise2= userData.update({totalexpense: Number.parseFloat( userData.totalexpense )- Number.parseFloat(expenseData.expenseamount)})

         Promise.all([promise1,promise2])
         .then(()=>{
            return res.status(200).json({ success: true, message: "Deleted Successfuly"})
            
            .catch((error ) => {
              throw new Error(error)
              })

         })


        //   if(result===0){
        //     return res.status(404).json({success: false, message: 'Expense does not belong to the user'})

        //   }
        //   return res.status(200).json({ success: true, message: "Deleted Successfuly"})

    }catch(err){
        console.log(err);
        return res.status(500).json({ success: true, message: "Failed"})
    }
 
}