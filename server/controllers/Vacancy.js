const Vacancy = require('../models/Vacancy');
const Employeer = require('../models/Employeer');
exports.addVacancy = async (req, res) => {
  const {
    Title,
    Contract,
    Environment,
    Industry,
    Country,
    City,
    Description,
    Skills,
    Benefits,
    Video,
  } = req.body.credentials;
  const user = await Employeer.findById(req.user);
  try {
    await new Vacancy({
      title: Title,
      contract: Contract,
      environment: Environment,
      industry: Industry,
      country: Country,
      city: City,
      description: Description,
      skills: Skills,
      benefits: Benefits,
      video: Video,
      employeer: req.user,
    }).save();
    res.status(200).json({
      message: 'Vacancy Added',
    });
  } catch (err) {
    res.json({
      message: 'Failed to add Vacancy',
    });
  }
};

//----------------------------Employeer All Vacancies

exports.getEmployeerVacancies = async (req, res) => {
  try {
    var Vacancies = await Vacancy.find({ employeer: req.user });
    res.status(200).json(Vacancies);
  } catch (err) {
    res.json(err);
  }
};
