const Company = require('../models/Company')

exports.createCompanyService = async (data) => {
    const result = await Company.create(data)
    return result
}
exports.getCompaniesService = async () => {
    const Companies = await Company.find({})
    return Companies
}