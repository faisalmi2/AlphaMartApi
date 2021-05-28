'use strict';

const utils=require('../utils');
const config=require('../../config');
const bcrypt = require('bcrypt');
const {Pool} =require('pg');

const Auth = async ({phoneNumber,password}) =>{
    try {
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('Account');
        
        const result = await pool.query(sqlQuery.auth,[phoneNumber]);
        
        const user=result.rows[0];
       
        if(!user) return {success:false, message:"Invalid email or password"};        
        if(!await bcrypt.compare(password,user.Password)) return {success:false, message:"Invalid email or password"};
        
        return {success:true,userInfo:user};
    } catch (err) {
        console.log(err);
        return 'user index: '+ err.message;
    }    
}


const GetContacts = async () =>{
    try {
        
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('Account');
       
        const result = await pool.query(sqlQuery.contacts);        
        
        const contacts=result.rows;       
        
        return {success:true,contacts:contacts};
    } catch (err) {
        return 'data => GetContacts '+ err.message;
    }    
}


module.exports={Auth,GetContacts}