const Candidate = require('../models/Candidate')

exports.createCandidateService = async (data) => {
    const result = await Candidate.create(data)
    return result
}
exports.getCandidatesService = async () => {
    const candidates = await Candidate.find({})
    return candidates
}