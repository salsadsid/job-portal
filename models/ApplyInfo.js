const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types
const applyInfoSchema = mongoose.Schema({
    jobId: {
        type: ObjectId,
        ref: "Job"

    },
    candidateId: [{
        type: ObjectId,
        ref: "Candidate"
    }]
}, {
    timestamps: true
})


const ApplyInfo = mongoose.model("ApplyInfo", applyInfoSchema)

module.exports = ApplyInfo;