// server.js
const express = require('express'); // Importing Express for server setup
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB connection and schema management
const bodyParser = require('body-parser'); // Importing body-parser to parse JSON payloads
const cors = require('cors'); // Importing CORS to allow cross-origin requests
const app = express(); // Initializing the Express application
const PORT = 5000; // Defining the server's port number

// Middleware for parsing JSON payloads
app.use(bodyParser.json());

// Setting up CORS to allow requests from specified origin and methods
app.use(cors({
  origin: 'http://localhost:3000', // Allowing requests from the frontend on localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowing these HTTP methods
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/schedulesDB', {
  useNewUrlParser: true, // Using new URL parser to handle MongoDB connection string
  useUnifiedTopology: true, // Opting in to the new MongoDB server discovery and monitoring engine
})
.then(() => console.log("Connected to MongoDB")) // Log success message upon connection
.catch(err => console.error("Could not connect to MongoDB...", err)); // Log error if connection fails

// Importing and using routes for handling schedule-related API requests
const scheduleRoutes = require('./routes/ScheduleRoutes');
app.use('/api/schedules', scheduleRoutes); // Prefixing routes with '/api/schedules'

const shopRoutes = require('./routes/shopRoutes');
app.use('/api/shop', shopRoutes);

const ProductRoutes = require('./routes/ProductRoutes');
app.use('/api/products', ProductRoutes);

// Importing and using routes for handling user-related API requests
const userRoutes = require('./routes/UserRoutes');
app.use('/api/users', userRoutes); // Prefixing routes with '/api/users'

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});