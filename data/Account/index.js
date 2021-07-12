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

const SignUp = async (user) =>{
    try {
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('Account');
        const hashedPassword=await GenerateHashedPassword(user.Password);
       
        const result = await pool.query(sqlQuery.signUp,
                                    [user.PhoneNumber
                                        ,hashedPassword
                                        ,user.Email
                                        ,user.RoleId
                                        ,user.FullName]
                                    );
        
        const userFromDb=result.rows[0];
      
        if(!userFromDb || !userFromDb.UserId) return {success:false, message:"Error while registering user."};        
        
        
        return {success:true,userId:userFromDb.UserId};
        //return {success:true,userId:100};
        
    } catch (err) {
        console.log(err);
        return 'user index: '+ err.message;
    }    
}


const GetUsers = async (roleId) =>{
    try {
        
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('Account');
       
        const result = await pool.query(sqlQuery.contacts,[roleId]);        
        
        const users=result.rows;       
        
        return {success:true,data:users};
    } catch (err) {
        return 'data => GetUsers '+ err.message;
    }    
}

const GetCustomers = async () =>{
    try {
        
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('Account');
       
        const result = await pool.query(sqlQuery.customers);        
        
        const users=result.rows;       
        
        return {success:true,data:users};
    } catch (err) {
        return 'data => GetUsers '+ err.message;
    }    
}

const ActivateUser = async (UserId,value) =>{
    try {
        
        const pool = new Pool(config.sql);       
        const sqlQuery =await utils.loadSQLQueries('Account');
       
        const result = await pool.query(sqlQuery.activateUser,[UserId,value]);        
        
        return {success:true};
    } catch (err) {
       //console.log(err);
       // return 'data => GetUsers '+ err.message;
        return {success:false};
    }    
}
async function GenerateHashedPassword(password)
{
    const salt=await bcrypt.genSalt(10);
    const hashed =await bcrypt.hash(password,salt)
    return hashed;
}

module.exports={Auth,GetUsers,SignUp,ActivateUser,GetCustomers}