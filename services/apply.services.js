const ApplyInfo = require('../models/ApplyInfo')

exports.createApplyInfoService = async (data) => {
    const result = await ApplyInfo.create(data)
    return result
}
exports.getApplyInfosService = async () => {
    const applyinfos = await ApplyInfo.find({})
    return applyinfos
}