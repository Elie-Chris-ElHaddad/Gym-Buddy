// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passwordHasher = require('../utils/passwordHasher');
const validator = require('../utils/validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        //Hashing the password using passwordHasher class
        const hashedPassword = await passwordHasher.hashPassword(req.body.password);

        //Email validation
        const email = req.body.email
        if (!validator.validateEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        let user = req.body
        req.body.password = hashedPassword

        const newUser = new User(user);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        //Finding the user for this email
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        //Comparing the password with the hashed password
        if (user && (await bcrypt.compare(req.body.password, user.password))) {
            //create a jwt token
            const token = jwt.sign({ userId: user._id }, "zjLL5.>RS7+b7yY95mAm53pitZfeh3hC9ED&awPJvV2MRyAm0<L@5^8%!@frs8@1", { expiresIn: '1h' });
            res.status(200).json({ message: "Login successful", user: user, token: token });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error occurred during login:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;