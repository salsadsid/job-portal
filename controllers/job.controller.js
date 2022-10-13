const { createJobService, getJobsService, findJobById, findCandidateByEmail, findCandidateById, findApplyInfoById } = require("../services/job.services")
const Candidate = require('../models/Candidate');
const ApplyInfo = require('../models/ApplyInfo');
exports.createJob = async (req, res, next) => {
    try {

        const result = await createJobService(req.body)


        res.status(200).json({
            status: 'success',
            message: "Job created Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: 'Job is not created',
            error: error.message
        })
    }
}
exports.getJobs = async (req, res, next) => {
    try {
        // const products = await Product.find({}, 'name quantity -_id').sort({ quantity: -1 });
        // const products = await Product
        //   .where("name").equals(/\w/)
        //   .where("quantity").gt(20).lt(600)
        //   .limit(3).sort({ quantity: -1 })

        let filters = { ...req.query }
        const excludedFields = ['sort', 'page', 'limit', 'fields']
        excludedFields.forEach(field => delete filters[field])

        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        // console.log(filterString)
        filters = JSON.parse(filterString)
        console.log(filters);
        const queries = {}
        // console.log(req.query)
        // console.log(filters)
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            // console.log(sortBy)
            queries.sortBy = sortBy
            // console.log(queries)
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            // console.log(fields)
            queries.fields = fields
            // console.log(fields)
        }
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;

            const skip = (page - 1) * Number(limit);

            queries.skip = skip;
            queries.limit = Number(limit)
        }
        const jobs = await getJobsService(filters, queries)
        res.status(200).json({
            status: "success",
            data: jobs
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message
        })
    }
}

exports.apply = async (req, res, next) => {
    try {
        const { id } = req.params
        const job = await findJobById(id);
        if (!job) {
            return res.status(401).json({
                status: "Fail",
                message: "Can't find this job by this id"
            })
        }

        const expired = new Date() > new Date(job.deadline)
        if (expired) {
            return res.status(401).json({
                status: "Fail",
                error: "Deadline Expired"
            })
        }
        const { _id: jobId } = job

        const applyInfo = await findApplyInfoById(jobId)
        const { candidateId } = applyInfo
        if (candidateId.includes(candidate._id)) {
            return res.status(401).json({
                status: "Fail",
                message: "Already Applied"
            })
        }
        // const { _id: candidateId } = candidate

        const res1 = await Candidate.updateOne(
            { _id: candidateId },
            { $push: { appliedJobs: jobId } }
        )
        const res2 = await ApplyInfo.updateOne(
            { _id: jobId },
            { $push: { CandidateId: candidateId } }
        )

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Apply Failed",
            error: error.message
        })
    }
}