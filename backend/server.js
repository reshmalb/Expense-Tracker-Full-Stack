const express= require('express')
const userRoutes= require('./routes/route')
const expenseRoutes=require('./routes/expense')
const sequelize=require('./utils/database')
const User=require('./models/user')
const Expense=require('./models/expense')

const cors = require('cors'); 

const app= express();
const port=3000;
let username;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
  })); 
app.use(userRoutes);

app.use(expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);


sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })