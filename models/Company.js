const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types
const companySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a brand name"],
        maxLength: 100,
        unique: true,
        lowercase: true
    },
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
    location: {
        type: String,
        lowercase: true
    },
    job: [{
        type: ObjectId,
        ref: "Job"
    }],
    hiringManager: {
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "HiringManager"
        }
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
})


const Company = mongoose.model("Company", companySchema)

module.exports = Company;