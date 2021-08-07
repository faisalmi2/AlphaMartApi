'use strict';

const utils=require('../utils');
const config=require('../../config');

const {Pool, Client} =require('pg');


const AddOrderSummaryToDB = async (order) =>{
    try {
        const pool = new Pool(config.sql);       

        const {summary,orderedItems} = order;
        const {CustomerId, TotalItems,TotalAmount,PartialOrderNumber} = summary;

        const sqlQuery =await utils.loadSQLQueries('Orders');
        let OrderSummaryId;
        const result = await pool.query('SELECT MAX("OrderCounter") counter FROM "OrderSummary" WHERE CAST("AddedOn" AS DATE) = CAST(now()  AS DATE)').
                        then(async (result) => 
                                {
                                   
                                    let todaysCounter=result.rows[0].counter;
                                    
                                    if(todaysCounter === null) todaysCounter=100;

                                    todaysCounter+=1;

                                    const orderNumber=PartialOrderNumber+''+todaysCounter;
                                    return await pool.query(sqlQuery.addOrderSummary,[CustomerId, TotalItems,TotalAmount,todaysCounter,orderNumber]);  
                                }
                        )
                        .then(async(result) =>
                            {

                                if(result.rows[0] &&  result.rows[0].OrderSummaryId === null) return;
                                OrderSummaryId= result.rows[0].OrderSummaryId;
                                
                                const OrderItemIds=[];
                                var ordersAdded = Promise.all(orderedItems.map( async(order) => {
                                        const { ItemId, ItemName, CountryName, SellingPrice, UnitName, OrderedQuantity, CategoryName, TotalPrice}= order;            
                                        const result = await pool.query(sqlQuery.addOrder,[OrderSummaryId, ItemId, ItemName, CountryName, SellingPrice, UnitName, OrderedQuantity, CategoryName, TotalPrice]);   
                                        
                                        OrderItemIds.push(result.rows[0].OrderItemId);             
                                    })).then(async()=>
                                        {
                                        
                                            if(OrderItemIds.length !== TotalItems) throw new Error('Error while inserting');
                                            await UpdateOrderStatus(OrderSummaryId,null,1);
                                        }
                                    );
                                   
                            }                         
                         );
                         return {success:true,OrderSummaryId:OrderSummaryId};
        
        return {success:true,OrderSummaryId:1};
        
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

const GetOrdersByCustomer = async (CustomerId) =>{
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

const GetOrdersByStatus = async (statusId) =>{
    try {
        
        const pool = new Pool(config.sql);      
        const sqlQuery =await utils.loadSQLQueries('Orders');        

        const result = await pool.query(sqlQuery.ordersByStatus,[statusId]);
        const orders=result.rows
        
        
         return {success:true,orders:orders};

    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }    
}

const UpdateOrderStatus = async (OrderSummaryId,SalespersonId,StatusId=1) =>{
    try {
        const pool = new Pool(config.sql);      
        const sqlQuery =await utils.loadSQLQueries('Orders');        
console.log(OrderSummaryId,SalespersonId,StatusId);
        const result = await pool.query(sqlQuery.updateOrderStatus,[OrderSummaryId,StatusId,SalespersonId]);
        const orders=result.rows        
         return {success:true};

    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }    
}

const AssignSaleperson = async (orderSummaryId,userId) =>{
    try {
        const pool = new Pool(config.sql);      
        const sqlQuery =await utils.loadSQLQueries('Orders');        
        
        const result = await pool.query(sqlQuery.assignSaleperson,[orderSummaryId,(userId==="-1"?null:userId)]);            
         return {success:true};

    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }    
}


const GetMyOrders = async (salePersonId,StatusId) =>{
    try {        
        const pool = new Pool(config.sql);      
        const sqlQuery =await utils.loadSQLQueries('Orders');        

        const result = await pool.query(sqlQuery.myOrders,[salePersonId,StatusId]);
        const orders=result.rows        
        
         return {success:true,orders:orders};

    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }     
}


module.exports={AddOrderSummaryToDB,UpdateOrderStatus,GetOrdersByCustomer,GetOrdersByStatus,AssignSaleperson,GetMyOrders}