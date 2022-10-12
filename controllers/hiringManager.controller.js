const { createHiringManagerService, getHiringManagersService } = require("../services/hiringManager.services")


exports.createHiringManager = async (req, res, next) => {
    try {
        const result = await createHiringManagerService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Successfully create the hiring manager"
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't create the hiring manager"
        })
    }
}
exports.getHiringManagers = async (req, res, next) => {
    try {
        const hiringManagers = await getHiringManagersService()

        res.status(200).json({
            status: "Success",
            data: hiringManagers
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the hiringManagers"
        })
    }

}