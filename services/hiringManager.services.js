const HiringManager = require('../models/HiringManager')

exports.createHiringManagerService = async (data) => {
    const result = await HiringManager.create(data)
    return result
}
exports.getHiringManagersService = async () => {
    const hiringManager = await HiringManager.find({})
    return hiringManager
}