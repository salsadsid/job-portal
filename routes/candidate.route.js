const express = require('express');
const candidateController = require('../controllers/candidate.controller');
const router = express.Router()

router.route('/').post(candidateController.createCandidate).get(candidateController.getCandidates)

module.exports = router;