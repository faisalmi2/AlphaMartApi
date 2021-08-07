'use strict'

const lookUpData = require('../data/LookUpTables');

const GetUnits = async (req,res,next) =>{
    try {
       const data= await lookUpData.GetUnitsFromDb();
       if(!data.success) return res.status(400).send(data.message);
      
        res.json(data.items);
    } catch (err) {
        console.log(err);
        res.send(err);
    }     
}

const GetCategories = async (req,res,next) =>{
    try {        
       const data= await lookUpData.GetCategoriesFromDb();
       if(!data.success) return res.status(400).send(data.message);
      
       res.json(data.items);
    } catch (err) {
        console.log(err);
        res.send(err);
    }     
}

const GetStatus = async (req,res,next) =>{
    try {                
       const data= await lookUpData.GetStatusFromDb();
       if(!data.success) return res.status(400).send(data.message);      
       res.json(data.items);
    } catch (err) {
        console.log(err);
        res.send(err);
    }     
}

module.exports={GetUnits,GetCategories,GetStatus}