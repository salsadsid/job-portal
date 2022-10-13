const express = require('express');
const jobController = require('../controllers/job.controller');
const authorization = require('../middleware/authorization');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router()

router.route('/:id/apply').post(jobController.apply)
router.route('/').post(jobController.createJob).get(jobController.getJobs)

module.exports = router;