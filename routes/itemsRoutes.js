'use strict';

const express =require('express');
const ItemController = require('../controllers/ItemController');
const router= express.Router();

const {GetItems,AddItem} = ItemController;

router.get('/Items',GetItems);
router.post('/Items',AddItem);

module.exports={
    routes:router
}