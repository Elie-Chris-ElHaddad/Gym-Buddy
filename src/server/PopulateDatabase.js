const fetch = require('node-fetch'); // Importing node-fetch for making HTTP requests
const mongoose = require('mongoose'); // Importing mongoose for MongoDB connection and schema management
const Exercise = require('./models/Exercise');  // Importing the Exercise model to define exercise structure

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gymApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected')) // Confirming successful MongoDB connection
    .catch(err => console.log(err)); // Logging error if connection fails

// Function to fetch data from your existing API and insert it into MongoDB
const populateDatabase = async () => {
    try {
        // Fetching exercise data from the external API
        const response = await fetch('http://your-api-url/exercises');  // Replace with your actual API URL
        const exercises = await response.json(); // Parsing the JSON response

        // Looping through each exercise in the fetched data
        exercises.forEach(async (exercise) => {
            const newExercise = new Exercise({
                name: exercise.name, // Setting exercise name
                description: exercise.description, // Setting exercise description
                category: exercise.category  // Setting category (adapt based on data structure)
            });

            try {
                await newExercise.save();  // Saving the exercise to MongoDB
                console.log(`Exercise saved: ${exercise.name}`); // Logging successful save
            } catch (error) {
                console.error(`Error saving exercise: ${exercise.name}`); // Logging save error for specific exercise
            }
        });
    } catch (error) {
        console.error('Error fetching exercises:', error); // Logging any error in fetching exercises
    }
};

// Invoking the function to populate the database with fetched data
populateDatabase();  
