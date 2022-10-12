const Job = require('../models/Job');
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
        .populate("company.id")
        .populate("hiringManager.id")
    const total = await Job.countDocuments(filters)
    const page = Math.ceil(total / queries.limit)
    return { total, page, jobs }
}

