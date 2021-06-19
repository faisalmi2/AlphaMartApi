'use strict';

const express =require('express');
const OrderController = require('../controllers/OrdersController');
const router= express.Router();

const {AddOrder} = OrderController;

router.post('/order',AddOrder);

module.exports={
    routes:router
}