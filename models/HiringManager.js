const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const hiringManagerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            trim: true,
            lowercase: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },
        email: {
            type: String,
            validate: [validator.isEmail, "Provide a valid Email"],
            trim: true,
            lowercase: true,
            unique: true,
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
        contactNumber: [{
            type: String,
            required: [true, "Please provide a contact number"],
            validate: {
                validator: (value) => {
                    return validator.isMobilePhone(value);
                },
                message: "Please provide a valid phone number",
            }
        }],
        job: [{
            type: ObjectId,
            ref: "Job"
        }],
        emergencyContactNumber: {
            type: String,
            required: [true, "Please provide  a emergency contact number"],
            validate: {
                validator: (value) => {
                    return validator.isMobilePhone(value);
                },
                message: "Please provide a valid phone number",
            },
        },
        imageURL: {
            type: String,
            validate: [validator.isURL, "Please provide a valid url"],
        },
        status: {
            type: String,
            default: "active",
            enum: ["active", "inactive"],
        }
    }, {
    timestamps: true
}
);

const HiringManager = mongoose.model("HiringManager", hiringManagerSchema);

module.exports = HiringManager;