'use strict';

const utils=require('../utils');
const config=require('../../config');

const {Pool} =require('pg');

const GetUnitsFromDb = async () =>{
    try {
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('LookUpTables');
        
        const result = await pool.query(sqlQuery.units);        
        const items=result.rows;

        return {success:true,items:items};
    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }    
}


const GetCategoriesFromDb = async () =>{
    try {
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('LookUpTables');
        
        const result = await pool.query(sqlQuery.categories);              
        const items=result.rows;

        return {success:true,items:items};
    } catch (err) {
        console.log(err);
        return {success:false,message:err.message};
    }    
}



module.exports={GetUnitsFromDb,GetCategoriesFromDb}