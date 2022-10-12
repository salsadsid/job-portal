const express = require('express');
const hiringManagerController = require('../controllers/hiringManager.controller');
const router = express.Router()

router.route('/').post(hiringManagerController.createHiringManager).get(hiringManagerController.getHiringManagers)

module.exports = router;