const mongoose = require('mongoose');

const employeerSchema = new mongoose.Schema({
  company: {
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
  confirm: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Employeer',
  },
});

module.exports = new mongoose.model('Employeer', employeerSchema);
