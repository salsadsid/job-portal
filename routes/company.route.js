const express = require('express');
const companyController = require('../controllers/company.controller');
const router = express.Router()

router.route('/').post(companyController.createCompany).get(companyController.getCompanies)

module.exports = router;