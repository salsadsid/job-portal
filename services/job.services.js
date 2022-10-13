const Job = require('../models/Job');
const Candidate = require('../models/Candidate');
const ApplyInfo = require('../models/ApplyInfo');
const Company = require('../models/Company');
const HiringManager = require('../models/HiringManager');


exports.createJobService = async (data) => {


    const job = await Job.create(data)
    const { _id: jobId, hiringManager, company } = job

    const res = await Company.updateOne(
        { _id: company.id },
        { $push: { job: jobId } }
    )
    const res2 = await HiringManager.updateOne(
        { _id: hiringManager.id },
        { $push: { job: jobId } }
    )
    console.log(res.nModified);
    console.log(res2.nModified);
    return job
}

exports.getJobsService = async (filters, queries) => {
    const jobs = await Job.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    const total = await Job.countDocuments(filters)
    const page = Math.ceil(total / queries.limit)
    return { total, page, jobs }
}

exports.findJobById = async (id) => {
    const job = await Job.findOne({ _id: id })
    return job
}
exports.findApplyInfoByJobId = async (jobId) => {
    const applyInfo = await ApplyInfo.findOne({ jobId })
    return applyInfo
}
exports.findCandidateById = async (id) => {
    const candidate = await Candidate.findOne({ _id: id })
    return candidate
}
