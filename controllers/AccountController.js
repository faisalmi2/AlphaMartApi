'use strict'

const authData = require('../data/Account');

const Auth = async (req,res,next) =>{
    try {
        const {phoneNumber,password}= req.query;        
       const data= await authData.Auth({phoneNumber,password});
       if(!data.success) return res.status(400).send(data.message);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.send(err);
    }     
}

const GetContacts = async (req,res,next) =>{
  
    try {
        const id=req.params.id;        
        const data= await authData.GetContacts({id});
        if(!data.success) return res.status(400).send(data.message);
         res.send(data);
        
    } catch (error) {
        
    }
}

module.exports={Auth,GetContacts}