'use strict';

const utils=require('../utils');
const config=require('../../config');
const bcrypt = require('bcrypt');
const {Pool} =require('pg');

const AddConversation = async ({SenderId, ReceiverId, Message}) =>{
    try {
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('conversation');
        
        const result = await pool.query(sqlQuery.addConversation,[SenderId, ReceiverId, Message]);
       // console.log(result);
        const conversation = result.rows[0];
       
        //if(!user) return {success:false, message:"Error while adding conversation"};        
        
        return {success:true,conversation:conversation};
    } catch (err) {
        return 'conversation index: '+ err.message;
    }    
}


const GetConversations = async (UserId,contactId,pageNumber) =>{
    try {
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('conversation');
        
        const result = await pool.query(sqlQuery.getConversations,[UserId,contactId,pageNumber]);
        
        const conversations = result.rows;
       
        //if(!user) return {success:false, message:"Error while adding conversation"};        
        
        return {success:true,conversations:conversations};
    } catch (err) {
        console.log(err);
        return 'conversation index: '+ err.message;
    }    
}


module.exports={AddConversation,GetConversations}