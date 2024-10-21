const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require('colors');
const connectDb = require('./config/config');

// dotenv config
dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Import routes
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes

// Use routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes); // Use user routes

// Port
const PORT = process.env.PORT || 8081;

// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgCyan.white);
});
