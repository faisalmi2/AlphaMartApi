'use strict';

const express =require('express');
const OrderController = require('../controllers/OrdersController');
const router= express.Router();

const {AddOrder,GetOrders} = OrderController;

router.get('/order',GetOrders);
router.post('/order',AddOrder);


module.exports={
    routes:router
}