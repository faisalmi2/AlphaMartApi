'use strict'

const db = require('../data/conversation');

const AddConversation = async (req,res,next) =>{
    try {        
       const {SenderId, ReceiverId, Message}= req.body;   
      
       const data= await db.AddConversation({SenderId, ReceiverId, Message});
       if(!data.success) return res.status(400).send(data.message);
       res.send(data);
    } catch (err) {
        console.log(err);
        res.send(err);
    }     
}

const GetConversations = async (req,res,next) =>{
    try {        
        
       const {id,contactId,pageNumber}= req.query;   
       
       const data= await db.GetConversations(id,contactId,pageNumber);
       if(!data.success) return res.status(400).send(data.message);
       res.send(data);
    } catch (err) {
        console.log(err);
        res.send(err);
    }     
}


module.exports={AddConversation,GetConversations}