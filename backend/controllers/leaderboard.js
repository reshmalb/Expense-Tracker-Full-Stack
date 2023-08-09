const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../utils/database');
const e = require('express');

const getUserLeaderBoard = async (req, res) => {
    try{
        // const leaderboardofusers = await User.findAll({
        //     attributes: ['id', 'name',[sequelize.fn('sum', sequelize.col('expenses.expenseamount')), 'total_cost'] ],
        //     include: [
        //         {
        //             model: Expense,
        //             attributes: []
        //         }
        //     ],
        //     group:['user.id'],
        //     order:[['total_cost', 'DESC']]

        // })
        const leaderboardofusers= await User.findAll({
            attributes:['id','name','totalexpense'],
            group:['user.id'],
            order:[['totalexpense', 'DESC']]

        });
       
        res.status(200).json(leaderboardofusers)
    
} catch (err){
    console.log(err)
    res.status(500).json(err)
}
}

module.exports = {
    getUserLeaderBoard
}