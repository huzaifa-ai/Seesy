const bycrpt = require('bcrypt');
const Employeer = require('../models/Employeer');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'fdfjkpkodjpd43434lmklkl';

//------------------------------------------------- Registering Employeer

exports.registerEmployeer = async (req, res) => {
  const { company, email, password, confirm } = req.body.credentials;
  if (password !== confirm) {
    res.status(422).json({
      message: 'Password does not match',
    });
    return;
  }
  if (
    !company ||
    company.length < 4 ||
    email.length < 4 ||
    password.length < 4 ||
    confirm.length < 4 ||
    !email ||
    !password ||
    !confirm
  ) {
    res.status(422).json({
      message: 'Fill in the credentials properly',
    });
    return;
  }

  const hashedPassword = await bycrpt.hash(password, 12);

  try {
    await new Employeer({
      company: company,
      email: email,
      password: hashedPassword,
      confirm: hashedPassword,
    }).save();
    res.status(200).json({
      message: 'Employeer registered successfull',
    });
  } catch (err) {
    res.status(401).json({
      message: 'Failed to registered Employeer',
    });
  }
};

// ------------------------------------------- Login Employeer

exports.LoginEmployeer = async (req, res) => {
  const { company, password } = req.body.credentials;
  console.log(password);

  if (!company || !password) {
    res.status(422).json({
      message: 'Fill the credentials properly',
    });
    return;
  }
  const employeer = await Employeer.findOne({ company }).exec();
  if (!employeer) {
    res.status(401).json({
      message: 'User not exists',
    });
    return;
  }
  console.log(employeer);
  try {
    const doMatch = await bycrpt.compare(password, employeer.password);
    console.log(doMatch);
    if (doMatch) {
      const token = jwt.sign({ userId: employeer._id }, JWT_SECRET);
      console.log(token);
      res.status(200).json(token);
    }
  } catch (err) {
    res.status(401).json({
      message: 'Incorrect Password or Email',
    });
  }
};

///-----------------lOGIN CANDIDATE

exports.LoginCandidate = async (req, res) => {
  const { email, password } = req.body.credentials;

  if (!email || !password) {
    res.status(422).json({
      message: 'Fill the credentials properly',
    });
    return;
  }
  const candidate = await Candidate.findOne({ email }).exec();
  console.log(candidate);
  if (!candidate) {
    res.status(401).json({
      message: 'User not exists',
    });
    return;
  }
  try {
    const doMatch = await bycrpt.compare(password, candidate.password);
    console.log(doMatch);
    if (doMatch) {
      const token = jwt.sign({ userId: candidate._id }, JWT_SECRET);
      console.log(token);
      res.status(200).json(token);
    }
  } catch (err) {
    res.status(401).json({
      message: 'Incorrect Password or Email',
    });
  }
};

/////-----------------Middleware for Candidate Authentication
exports.employeerAuth = (req, res, next) => {
  console.log(req.headers);
  const { authtoken } = req.headers;

  console.log(authtoken);
  if (!authtoken) {
    res.status(401).json({
      message: 'Please Login',
    });
  }
  const userId = jwt.verify(authtoken, JWT_SECRET).userId;
  req.user = userId;
  next();
};

//------------------------Current Employee

exports.currentEmployeer = async (req, res) => {
  const user = await Employeer.findById(req.user).exec();
  res.status(200).json(user);
};
