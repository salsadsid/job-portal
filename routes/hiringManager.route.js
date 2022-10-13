const express = require('express');
const hiringManagerController = require('../controllers/hiringManager.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');
const router = express.Router()

router.route('/').post(hiringManagerController.createHiringManager)

router.route('/jobs').get(verifyToken, authorization("hiring-manager"), hiringManagerController.getHiringManagerJob)
router.route('/jobs/:id').get(verifyToken, authorization("hiring-manager"), hiringManagerController.getHiringManagerJobDetails)

module.exports = router;