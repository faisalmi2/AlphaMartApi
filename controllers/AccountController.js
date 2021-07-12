'use strict'
require('dotenv').config();
const jwt = require('jsonwebtoken');


const authData = require('../data/Account');

const Auth = async (req,res,next) =>{
    try {
        const {phoneNumber,password}= req.body;      
        
       const data= await authData.Auth({phoneNumber,password});
       if(!data.success) return res.status(400).send(data.message);
       
        const accessToken = generateAccessToken(data.userInfo);
        const refreshAccessToken = jwt.sign(data.userInfo,process.env.REFRESH_TOKEN_SECRET)
       
        res.json({accessToken:accessToken ,refreshToken:refreshAccessToken});
    } catch (err) {
        console.log(err);
        res.send(err);
    }     
}

const SignUp= async (req,res,next)=>{
    const {PhoneNumber,Password,Email,RoleId,FullName}= req.body;   
    const user={PhoneNumber,Password,Email,RoleId,FullName};

    const data= await authData.SignUp(user);
    if(!data.success) return res.status(400).send(data.message);
    res.send(data);
} 

const GetUsersData = async (req,res,next) =>{
  
    try {      
        const {roleId} =req.query;         
        const data= await authData.GetUsers(roleId);        
        if(!data.success) return res.status(400).send(data.message);
         res.send(data);
        
    } catch (error) {
        
    }
}

const GetCustomersData = async (req,res,next) =>{  
    try {      
        const data= await authData.GetCustomers();        
        if(!data.success) return res.status(400).send(data.message);
         res.send(data);        
    } catch (error) {
        
    }
}


const ActivateDeactivateUser = async (req,res,next) =>{
  
    try {
        const UserId=req.body.UserId;        
        const value=req.body.value;       

        const data= await authData.ActivateUser(UserId,value);        
        if(!data.success) return res.status(400).send(data.message);
         res.send(data);
        
    } catch (error) {
        
    }
}

function generateAccessToken(userInfo)
{
    return jwt.sign(userInfo,process.env.TOKEN_SECRET,{expiresIn:'1hr'});
}

function authenthicateToken(req,res,next)
{
  
    const authHeader=req.headers['authorization'];    
    console.log('authHeader',authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token',token);
    if(token == null) return res.sendStatus(401);
    
    jwt.verify(token,process.env.TOKEN_SECRET,(err,userInfo)=>{
        if(err) return res.sendStatus(403);

        req.userInfo=userInfo;
        next();
    })
}

module.exports={Auth,GetUsersData,SignUp,authenthicateToken,ActivateDeactivateUser,GetCustomersData}