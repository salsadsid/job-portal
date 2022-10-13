const { createApplyInfoService, getApplyInfosService } = require("../services/apply.services")


exports.createApplyInfo = async (req, res, next) => {
    try {
        const result = await createApplyInfoService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Successfully create the Apply Info"
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't create the Apply Info"
        })
    }
}
exports.getApplyInfos = async (req, res, next) => {
    try {
        const appliedinfos = await getApplyInfosService()

        res.status(200).json({
            status: "Success",
            data: appliedinfos
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the applied infos"
        })
    }

}