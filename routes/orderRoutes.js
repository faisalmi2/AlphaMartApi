'use strict';

const express =require('express');
const OrderController = require('../controllers/OrdersController');
const router= express.Router();

const {AddOrder,GetOrdersByCustomer,GetOrdersByStatus,AssignSaleperson,GetMyOrders,UpdateOrderStatus} = OrderController;

router.get('/order/ByStatus',GetOrdersByStatus);
router.get('/order',GetOrdersByCustomer);
router.get('/order/myorders',GetMyOrders);
router.post('/order',AddOrder);
router.post('/order/assignsaleperson',AssignSaleperson);
router.post('/order/updateorderstatus',UpdateOrderStatus);

module.exports={
    routes:router
}