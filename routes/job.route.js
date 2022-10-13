const express = require('express');
const jobController = require('../controllers/job.controller');
const hiringManagerController = require('../controllers/hiringManager.controller');
const authorization = require('../middleware/authorization');
const verifyToken = require('../middleware/verifyToken');
const uploader = require('../middleware/uploader');
const router = express.Router()

router.route('/:id/apply').post(uploader.array("resume"), jobController.apply)
router.route('/:id').get(hiringManagerController.getHiringManagerJobDetails)
router.route('/').post(verifyToken, authorization("hiring-manager"), jobController.createJob).get(jobController.getJobs)

module.exports = router;