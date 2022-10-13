const express = require('express');

const router = express.Router();
const { addVacancy, getEmployeerVacancies } = require('../controllers/Vacancy');
const { employeerAuth } = require('../controllers/Employeer');

router.post('/addVacancy', employeerAuth, addVacancy);
router.get('/EmployeerAllVacancies', employeerAuth, getEmployeerVacancies);

module.exports = router;
