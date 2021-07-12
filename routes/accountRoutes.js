'use strict';

const express =require('express');
const AccountController = require('../controllers/AccountController');
const router= express.Router();

const {Auth,GetUsersData,authenthicateToken,SignUp,ActivateDeactivateUser,GetCustomersData} = AccountController;

router.post('/Account/Auth',Auth);
//router.get('/Account/Users',authenthicateToken,GetUsersData);
router.get('/Account/Users',GetUsersData);
router.get('/Account/Customers',GetCustomersData);
router.post('/Account/SignUp',SignUp);
router.post('/Account/activate',ActivateDeactivateUser);

//git commit -m "add Order to db completed"
//git push -u origin master

module.exports={
    routes:router
}