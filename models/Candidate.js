const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types
const candidateSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a Candidate name"],
        maxLength: 100,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        lowercase: true
    },
    resume: [{
        type: String,
    }],
    appliedJobs: [{
        type: ObjectId,
        ref: "Job"
    }],
    contactNumber: {
        type: String,
        required: [true, "Please provide  a emergency contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide a valid phone number",
        },
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
})


const Candidate = mongoose.model("Candidate", candidateSchema)

module.exports = Candidate;