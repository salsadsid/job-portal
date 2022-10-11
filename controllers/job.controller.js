const { createJobService, getJobsService } = require("../services/job.services")

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