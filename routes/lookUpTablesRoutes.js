'use strict';

const express =require('express');
const LookUpTablesController = require('../controllers/LookUpTablesController');
const router= express.Router();

const {GetUnits,GetCategories,GetStatus} = LookUpTablesController;

router.get('/LookUpTables/Units',GetUnits);
router.get('/LookUpTables/Categories',GetCategories);
router.get('/LookUpTables/Status',GetStatus);

module.exports={
    routes:router
}