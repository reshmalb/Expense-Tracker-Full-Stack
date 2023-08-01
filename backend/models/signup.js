const Sequelize = require('sequelize');
const sequelize= require('../utils/database');

const Signup= sequelize.define(
    'signup',{
        username:{
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false
        }
    }
)

module.exports = Signup;