'use strict';

const utils=require('../utils');
const config=require('../../config');

const {Pool} =require('pg');

const GetItemsFromDb = async () =>{
    try {
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('Items');
        
        const result = await pool.query(sqlQuery.items);        
        const items=result.rows;

        return {success:true,items:items};
    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }    
}


const AdditemToDB = async (item) =>{
    try {
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('Items');
        const {ItemName,UnitId,Quantity,CostPrice,ActualPrice,SellingPrice,ItemCategoryId,IsActive,AddedBy}= item;

        const result = await pool.query(sqlQuery.addItem,[ItemName,UnitId,Quantity,CostPrice,ActualPrice,SellingPrice,ItemCategoryId,IsActive,AddedBy]);        
       
        const itemId=result.rows[0].ItemId;       
        return {success:true,itemId:itemId};
    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }    
}



module.exports={GetItemsFromDb,AdditemToDB}