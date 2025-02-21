const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDb =require('./config/config');
const itemModel =require('./models/itemModel');
const items =require('./utils/data');
const { bgGreen } = require('colors');
require('colors');

//fuction seeder
const importData =async ()=>{
    try {
        await itemModel.deleteMany();
        const itemsData =await itemModel.insertMany(items);
        console.log("All Items Added".bgGreen);
        process.exit();
    } catch (error) {
        console.log(`${error}`.bgRed.inverse);
        process.exit(1);
    }
};
importData();