const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');  // Import the Exercise model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gymApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Function to fetch data from your existing API and insert it into MongoDB
const populateDatabase = async () => {
    try {
        const response = await fetch('http://your-api-url/exercises');  // Your existing API URL
        const exercises = await response.json();

        exercises.forEach(async (exercise) => {
            const newExercise = new Exercise({
                name: exercise.name,
                description: exercise.description,
                category: exercise.category  // Adapt this according to the data structure
            });

            try {
                await newExercise.save();  // Save to MongoDB
                console.log(`Exercise saved: ${exercise.name}`);
            } catch (error) {
                console.error(`Error saving exercise: ${exercise.name}`);
            }
        });
    } catch (error) {
        console.error('Error fetching exercises:', error);
    }
};

populateDatabase();  // Call the function to populate the database
