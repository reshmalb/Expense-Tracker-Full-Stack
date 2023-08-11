const express= require('express')
const userRoutes= require('./routes/user')
const expenseRoutes=require('./routes/expense')
const purchaseRoutes=require('./routes/purchase')
const leaderboardRoutes= require('./routes/leaderboard')
const passwordRoutes = require('./routes/password')
const sequelize=require('./utils/database')
const User=require('./models/user')
const Expense=require('./models/expense')
const Order= require('./models/order')
const path = require('path');

const cors = require('cors'); 
const { countReset } = require('console')

const app= express();
const port=3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
  })); 
  
app.use(userRoutes);

app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(leaderboardRoutes);
app.use(passwordRoutes)
app.get("/",cors(),(req,res)=>{
    
})

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })