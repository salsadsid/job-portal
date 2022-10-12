const { createCompanyService, getCompaniesService } = require("../services/company.services")


exports.createCompany = async (req, res, next) => {
    try {
        const result = await createCompanyService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Successfully create the company"
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't create the company"
        })
    }
}
exports.getCompanies = async (req, res, next) => {
    try {
        const companies = await getCompaniesService()

        res.status(200).json({
            status: "Success",
            data: companies
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the companies"
        })
    }

}