const mongoose = require('mongoose');
const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Candidate',
  },
});

module.exports = new mongoose.model('Candidate', candidateSchema);
