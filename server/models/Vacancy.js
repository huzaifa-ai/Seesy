const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const vacancySchema = new mongoose.Schema({
  title: String,
  contract: String,
  environment: String,
  industry: String,
  country: String,
  city: String,
  description: String,
  skills: [
    {
      type: String,
    },
  ],
  benefits: [
    {
      type: String,
    },
  ],
  video: {
    url: String,
    id: String,
  },
  employeer: {
    type: ObjectId,
    ref: 'Employeer',
  },
});

module.exports = new mongoose.model('Vacancy', vacancySchema);
