'use strict';

const express =require('express');
const AccountController = require('../controllers/AccountController');
const router= express.Router();

const {Auth,GetContacts} = AccountController;

router.get('/Account/Auth',Auth);
router.get('/Account/Contacts/:id',GetContacts);

module.exports={
    routes:router
}