const Razorpay = require('razorpay');
const Order = require('../models/order')
const userController= require('./user')
require('dotenv').config();




/*---------Creating order_id------------ */
const purchasepremium =async (req, res) => {
    try {
        console.log("env>>>>>>>",process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET)
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;
        // console.log("rzp,rzp",rzp)

        rzp.orders.create({amount, currency: "INR" },async (err, order) => {
            if(err) {
                console.error("Razorpay API Error:", err)
                throw new Error(JSON.stringify(err));
            }
         
            const orderResponse= await Order.create({
                   orderid:order.id,
                   status:'PENDING',
                   userId: req.user.id

            })
            if(orderResponse){
                return res.status(201).json({ order, key_id : rzp.key_id});

            }
            else{
                throw new Error(err)
            }
        //     req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
        //         return res.status(201).json({ order, key_id : rzp.key_id});

        //     }).catch(err => {
        //         throw new Error(err)
        //     })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err})
    }
}


/*---------Creating payment_id------------ */

const updateTransactionStatus = async (req, res ) => {
    try {
        const userId = req.user.id;

        const { payment_id, order_id} = req.body;

        const order  = await Order.findOne({where : {orderid : order_id}}) //2
        const promise1 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
        const promise2 =  req.user.update({ ispremiumuser: true }) 

        Promise.all([promise1, promise2]).then(()=> {
            return res.status(202).json({sucess: true, message: "Transaction Successful", token: userController.generateAccessToken(userId,undefined , true) });
        }).catch((error ) => {
            throw new Error(error)
        })

        
                
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
}

module.exports={
    purchasepremium,
    updateTransactionStatus

}