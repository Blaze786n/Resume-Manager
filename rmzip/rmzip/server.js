// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();  // Add this line to load environment variables

const User = require('./models/user');
const Resume = require('./models/resume');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB Atlas using the environment variable
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

// User registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
});

// User login endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await user.comparePassword(password)) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        res.status(400).send('Error logging in');
    }
});

// Save resume endpoint
app.post('/resume', async (req, res) => {
    try {
        const resume = new Resume(req.body);
        await resume.save();
        res.status(201).send('Resume saved');
    } catch (err) {
        res.status(400).send('Error saving resume');
    }
});

// Fetch a single resume endpoint
app.get('/resume', async (req, res) => {
    try {
        const resume = await Resume.findOne();
        res.status(200).json(resume);
    } catch (err) {
        res.status(400).send('Error fetching resume');
    }
});

// Fetch all resumes endpoint for admin
app.get('/admin/resumes', async (req, res) => {
    try {
        const resumes = await Resume.find();
        res.status(200).json(resumes);
    } catch (err) {
        res.status(400).send('Error fetching resumes');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
