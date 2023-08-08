const express= require('express')
const userRoutes= require('./routes/user')
const expenseRoutes=require('./routes/expense')
const purchaseRoutes=require('./routes/purchase')
const sequelize=require('./utils/database')
const User=require('./models/user')
const Expense=require('./models/expense')
const Order= require('./models/order')

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
app.use(purchaseRoutes)

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