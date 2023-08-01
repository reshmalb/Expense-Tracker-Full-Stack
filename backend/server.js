const express= require('express')
const userRoutes= require('./routes/route')
const sequelize=require('./utils/database')
const cors = require('cors'); 

const app= express();
const port=3000;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
  })); 
app.use(userRoutes);



sequelize.sync()
.then(result=>{
    console.log(result);
})
.catch(err0r=>{
    console.log(error);
})


app.listen(port,'localhost',()=>{
    console.log(`listening to ${port}`)
})