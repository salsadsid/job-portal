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
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid website"]
    },
    company: {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Company"
        }
    },
    deadline: {
        type: Date,
        required: true
    },
    skills: [{
        type: String
    }],
    openings: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        lowercase: true
    },
    hiringManager: {
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "HiringManager"
        }
    },
    appliedCandidatesId: [{
        type: ObjectId,
        ref: "Candidate",
    }],
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