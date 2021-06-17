'use strict'

const ItemData = require('../data/Items');

const GetItems = async (req,res,next) =>{
    try {
        const {CategoryId,SearchText} =req.query;
        
        const data= await ItemData.GetItemsFromDb(CategoryId,SearchText);
        if(!data.success) return res.status(400).send(data.message);      
        res.json(data.items);
    } catch (err) {
        console.log(err);
        res.send(err);
    }     
}

const AddItem = async (req,res,next) =>{
    try { 
        const {ItemName, UnitId, Quantity, CostPrice, ActualPrice, SellingPrice, ItemCategoryId, IsActive, AddedBy}=req.body;

        const item={            
            ItemName:ItemName,
            UnitId:UnitId,
            Quantity:Quantity,
            CostPrice:CostPrice,
            ActualPrice:ActualPrice, 
            SellingPrice:SellingPrice, 
            ItemCategoryId:ItemCategoryId, 
            IsActive:IsActive, 
            AddedBy:AddedBy            
        }
        const data= await ItemData.AdditemToDB(item);
       if(!data.success) return res.status(400).send(data.message);      
       res.json({"itemid":data.itemId});
    } catch (err) {
        
    }
}

module.exports={GetItems,AddItem}