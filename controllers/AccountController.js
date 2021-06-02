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

function generateAccessToken(userInfo)
{
    return jwt.sign(userInfo,process.env.TOKEN_SECRET,{expiresIn:'1hr'});
}

const GetContacts = async (req,res,next) =>{
  
    try {
       // console.log('header',req.test);
        //const id=req.params.id;        
        const data= await authData.GetContacts();        
        if(!data.success) return res.status(400).send(data.message);
         res.send(data);
        
    } catch (error) {
        
    }
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

module.exports={Auth,GetContacts,authenthicateToken}