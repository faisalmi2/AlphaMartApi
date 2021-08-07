'use strict';

const express =require('express');
const ItemController = require('../controllers/ItemController');
const router= express.Router();
const multer=require('multer');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// })
// var uploads = multer({ storage: storage })


const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {        
        cb(null,'./uploads');
    },
    filename:function (req,file,cb) {
        cb(null,file.originalname)   
    }
})
const uploads=multer({storage});

const {GetItems,AddItem} = ItemController;

router.get('/Items',GetItems);
router.post('/Items',uploads.single('image'), AddItem);  

module.exports={
    routes:router
}