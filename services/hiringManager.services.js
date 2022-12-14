const mongoose = require('mongoose');
const HiringManager = require('../models/HiringManager')
const Job = require('../models/Job')
const { ObjectId } = mongoose.Types.ObjectId
exports.createHiringManagerService = async (data) => {
    const result = await HiringManager.create(data)
    return result
}
exports.getHiringManagerJobsService = async (email) => {
    const hiringManager = await HiringManager.find({ email })
    // console.log(hiringManager);
    console.log(hiringManager[0].job);
    const jobs = hiringManager[0].job
    const getjobs = await Job.find({ _id: jobs })
    // console.log(getjobs);
    return getjobs
}
exports.getHiringManagerJobDetailsService = async (id) => {
    const jobDetails = await Job.find({ _id: id }).populate('appliedCandidatesId').populate('hiringManager')
    // console.log(hiringManager);
    // console.log(hiringManager[0].job);
    // const jobs = hiringManager[0].job
    // const getjobs = await Job.find({ _id: jobs })
    // console.log(getjobs);
    return jobDetails
}
exports.updateAJobService = async (id, data) => {
    const jobDetails = await Job.updateOne({ _id: id }, data)
    // console.log(hiringManager);
    // console.log(hiringManager[0].job);
    // const jobs = hiringManager[0].job
    // const getjobs = await Job.find({ _id: jobs })
    // console.log(getjobs);
    return jobDetails
}