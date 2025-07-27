const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    education: [
        {
            degree: { type: String, required: true },
            institution: { type: String, required: true },
            year: { type: Number, required: true }
        }
    ],
    experience: [
        {
            company: { type: String, required: true },
            role: { type: String, required: true },
            years: { type: Number, required: true }
        }
    ],
    skills: { type: [String], required: true }
});

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
