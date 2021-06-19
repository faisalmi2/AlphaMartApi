'use strict'

const OrdersData = require('../data/Orders');

const AddOrder = async (req,res,next) =>{
    try {
        const {order} =req.body;       
        
        const data= await OrdersData.AddOrderSummaryToDB(order);
        if(!data.success) return res.status(400).send(data.message);      
        res.json(data);
    } catch (err) {
        console.log(err);
        res.send(err);
    }     
}

module.exports={AddOrder}