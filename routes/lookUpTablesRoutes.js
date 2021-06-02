'use strict';

const express =require('express');
const LookUpTablesController = require('../controllers/LookUpTablesController');
const router= express.Router();

const {GetUnits,GetCategories} = LookUpTablesController;

router.get('/LookUpTables/Units',GetUnits);
router.get('/LookUpTables/Categories',GetCategories);

module.exports={
    routes:router
}