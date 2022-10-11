const Job = require('../models/Job');


exports.createJobService = async (data) => {


    const result = await Job.create(data)
    // const { _id: productId, brand } = product

    // const res = await Brand.updateOne(
    //     { _id: brand.id },
    //     { $push: { products: productId } }
    // )
    // console.log(res.nModified);
    return result
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

