const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types
const jobSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please provide a job title"],
        maxLength: 100,
        lowercase: true
    },
    type: {
        type: String,
        enum: ["part-time", "full-time", "internship"]
    },
    salaryRange: String,
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        lowercase: true
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid website"]
    },
    company: {
        type: String,
        required: [true, "Please provide a company name"],
        unique: true,
    },
    deadline: {
        type: Date,
        required: true
    },
    skills: {
        type: String
    },
    openings: {
        type: Number,
        required: true
    },
    location: String,
    // supplier: [{
    //     name: String,
    //     contactNumber: String,
    //     id: {
    //         type: ObjectId,
    //         ref: "Supplier"
    //     }
    // }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
})


const Job = mongoose.model("Job", jobSchema)

module.exports = Job;