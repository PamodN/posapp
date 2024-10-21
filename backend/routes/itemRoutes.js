const express = require('express');
const { getItemController,addItemController,updateItemController,deleteItemController } = require('../controller/itemController');
const router = express.Router();

//routes

router.get('/get-item',getItemController);
router.post('/add-item',addItemController);
router.put('/update-item',updateItemController);
router.delete('/delete-item',deleteItemController);

module.exports =router;