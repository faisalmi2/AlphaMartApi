'use strict';

const express =require('express');
const AccountController = require('../controllers/AccountController');
const router= express.Router();

const {Auth,GetContacts,authenthicateToken} = AccountController;

router.post('/Account/Auth',Auth);
router.get('/Account/Contacts',authenthicateToken,GetContacts);




module.exports={
    routes:router
}