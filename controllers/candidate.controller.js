const { createCandidateService, getCandidatesService } = require("../services/candidate.services")


exports.createCandidate = async (req, res, next) => {
    try {
        const result = await createCandidateService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Successfully create the candidate"
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't create the candidate"
        })
    }
}
exports.getCandidates = async (req, res, next) => {
    try {
        const candidates = await getCandidatesService()

        res.status(200).json({
            status: "Success",
            data: candidates
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "Fail",
            error: "Couldn't get the candidates"
        })
    }

}