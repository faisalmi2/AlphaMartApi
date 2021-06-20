'use strict';

const utils=require('../utils');
const config=require('../../config');

const {Pool} =require('pg');


const AddOrderSummaryToDB = async (order) =>{
    try {
        const pool = new Pool(config.sql);       

        const {summary,orderedItems} = order;
        const {CustomerId, TotalItems,TotalAmount} = summary;

        const sqlQuery =await utils.loadSQLQueries('Orders');        

        const result = await pool.query(sqlQuery.addOrderSummary,[CustomerId, TotalItems,TotalAmount]);
        const OrderSummaryId=result.rows[0].OrderSummaryId; 
        
        if(OrderSummaryId !== undefined)      
        {
          const OrderItemIds = await  AddOrdersToDB(OrderSummaryId,orderedItems);          
          if(OrderItemIds.length !== TotalItems) throw new Error('Error while inserting');

         await UpdateOrderStatus(OrderSummaryId,1);
          return {success:true,OrderSummaryId:OrderSummaryId};
          
        }
        
    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }    
}


const AddOrdersToDB = async (OrderSummaryId,orderedItems) =>{
    try {
        const pool = new Pool(config.sql);        
                
        const sqlQuery =await utils.loadSQLQueries('Orders');
        const OrderItemIds=[];
       var ordersAdded = Promise.all(orderedItems.map( async(order) => {
            const { ItemId, ItemName, CountryName, SellingPrice, UnitName, OrderedQuantity, CategoryName, TotalPrice}= order;            
            const result = await pool.query(sqlQuery.addOrder,[OrderSummaryId, ItemId, ItemName, CountryName, SellingPrice, UnitName, OrderedQuantity, CategoryName, TotalPrice]);   
            OrderItemIds.push(result.rows[0].OrderItemId);             
        })).then(()=> OrderItemIds);
        return ordersAdded;
        
    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }    
}

const GetOrders = async (CustomerId) =>{
    try {
        
        const pool = new Pool(config.sql);      
        const sqlQuery =await utils.loadSQLQueries('Orders');        

        const result = await pool.query(sqlQuery.pendingOrders,[CustomerId]);
        const orders=result.rows
        
        
         return {success:true,orders:orders};

    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }    
}

const UpdateOrderStatus = async (OrderSummaryId,StatusId=1) =>{
    try {
        const pool = new Pool(config.sql);      
        const sqlQuery =await utils.loadSQLQueries('Orders');        

        const result = await pool.query(sqlQuery.updateOrderStatus,[OrderSummaryId,StatusId]);
        const orders=result.rows        
         return {success:true};

    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }    
}


module.exports={AddOrderSummaryToDB,UpdateOrderStatus,GetOrders}