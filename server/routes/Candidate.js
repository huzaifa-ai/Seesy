const express = require('express');
const router = express.Router();
const {
  registerCandidate,
  LoginCandidate,
  currentCandidate,
  candidateAuth,
} = require('../controllers/Candidate');

router.post('/registerCandidate', registerCandidate);
router.post('/LoginCandidate', LoginCandidate);
router.get('/current-Employee', candidateAuth, currentCandidate);

module.exports = router;
