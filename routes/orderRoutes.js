'use strict';

const express =require('express');
const OrderController = require('../controllers/OrdersController');
const router= express.Router();

const {AddOrder,GetOrdersByCustomer,GetOrdersByStatus,AssignSaleperson} = OrderController;

router.get('/order/ByStatus',GetOrdersByStatus);
router.get('/order',GetOrdersByCustomer);
router.post('/order',AddOrder);
router.post('/order/assignsaleperson',AssignSaleperson);


module.exports={
    routes:router
}