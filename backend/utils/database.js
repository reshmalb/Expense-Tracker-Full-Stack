const Sequelize=require('sequelize');
const sequelize=new Sequelize(
    'expense-tracker','root','Reshma1988',{
        dialect:'mysql',
        host:'localhost'
    }
);
module.exports =sequelize;