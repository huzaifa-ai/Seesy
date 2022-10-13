const express = require('express');

const router = express.Router();
const {
  registerEmployeer,
  LoginEmployeer,
  employeerAuth,
  currentEmployeer,
} = require('../controllers/Employeer');

router.post('/registerEmployeer', registerEmployeer);
router.post('/loginEmployeer', LoginEmployeer);
router.get('/current-Employeer', employeerAuth, currentEmployeer);

module.exports = router;
