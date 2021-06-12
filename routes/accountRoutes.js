'use strict';

const express =require('express');
const AccountController = require('../controllers/AccountController');
const router= express.Router();

const {Auth,GetUsersData,authenthicateToken,SignUp,ActivateDeactivateUser} = AccountController;

router.post('/Account/Auth',Auth);
//router.get('/Account/Users',authenthicateToken,GetUsersData);
router.get('/Account/Users',GetUsersData);
router.post('/Account/SignUp',SignUp);
router.post('/Account/activate',ActivateDeactivateUser);




module.exports={
    routes:router
}