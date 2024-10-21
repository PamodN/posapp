const itemModel = require('../models/itemModel');

// get item
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).send(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// add item
const addItemController = async (req, res) => {
  try {
    const newItem = new itemModel(req.body);
    await newItem.save();
    res.status(201).send("Item created successfully");
  } catch (error) {
    res.status(400).send("Error", error);
    console.log(error);
  }
};

// put item
const updateItemController = async (req, res) => {
  try {
    const filter = { _id: req.body.itemId };
    const update = req.body;

    await itemModel.findOneAndUpdate(filter, update);
    
    res.status(200).send('Item Updated!');
  } catch (error) {
    console.error(error);
    res.status(400).send('Error updating item');
  }
};
//delete-item
const deleteItemController = async (req, res) => {
  try {
    const filter = { _id: req.body.itemId };

    await itemModel.findOneAndDelete(filter);
    
    res.status(200).send('Item Deleted!');
  } catch (error) {
    console.error(error);
    res.status(400).send('Error deleting item');
  }
};

module.exports = { getItemController, addItemController, updateItemController,deleteItemController };
