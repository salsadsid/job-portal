const express = require('express');
const applyController = require('../controllers/apply.controller');
const router = express.Router()

router.route('/').post(applyController.createApplyInfo).get(applyController.getApplyInfos)

module.exports = router;