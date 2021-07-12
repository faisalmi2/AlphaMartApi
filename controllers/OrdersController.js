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

const GetOrdersByCustomer = async (req,res,next) =>{
    try {
        const {CustomerId} =req.query;               
        const data= await OrdersData.GetOrdersByCustomer(CustomerId);
        if(!data.success) return res.status(400).send(data.message);      
        res.json(data);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

const GetOrdersByStatus = async (req,res,next) =>{
    try {
        const {statusId} =req.query;        
        
        const data= await OrdersData.GetOrdersByStatus(statusId);
        if(!data.success) return res.status(400).send(data.message);      
        res.json(data);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

const AssignSaleperson = async (req,res,next) =>{
    try {
        const {userId,orderSummaryId} =req.body;        
          
        const data= await OrdersData.AssignSaleperson(orderSummaryId,userId);
        if(!data.success) return res.status(400).send(data.message);      
        res.json(data);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

module.exports={AddOrder,GetOrdersByCustomer,GetOrdersByStatus,AssignSaleperson}
