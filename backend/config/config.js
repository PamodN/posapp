const mongoose =require('mongoose');
require('colors')

//conectDB Function

const url = 'mongodb+srv://pamod:pamod@cluster0.fcpge0l.mongodb.net/student?retryWrites=true&w=majority';

const connectDb = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected successfully'.bgYellow);
  } catch (error) {
    console.log('MongoDB error', error);
  }
};

// connect to MongoDB
connectDb();

module.exports = connectDb;