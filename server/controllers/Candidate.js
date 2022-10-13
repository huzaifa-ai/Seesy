const bycrpt = require('bcrypt');
const Candidate = require('../models/Candidate');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'fdfjkpkodjpd43434lmklkl';

/////---------------- REGISTERING CANDIDATE
exports.registerCandidate = async (req, res) => {
  const { name, email, password, confirm } = req.body.credentials;
  const candidate = await Candidate.findOne({ email });
  if (
    !name ||
    name.length < 5 ||
    !email ||
    !password ||
    password.length < 5 ||
    !confirm ||
    confirm.length < 5
  ) {
    res.status(422).json({
      message: 'Fill the credentials properly',
    });
    return;
  }
  if (password != confirm) {
    res.status(422).json({
      message: 'Password not equal',
    });
    return;
  }
  if (candidate) {
    res.status(401).json({
      message: 'User Already exists',
    });
    return;
  }

  const hashedPassword = await bycrpt.hash(password, 8);
  try {
    await new Candidate({
      name: name,
      email: email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    }).save();
    res.status(200).json({
      message: 'Registered. Signin to continue',
    });
    console.log('Candidate registered');
  } catch (err) {
    res.status(401).json({
      message: 'Failed to register candidate',
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
exports.candidateAuth = (req, res, next) => {
  console.log(req.headers);
  const { authtoken } = req.headers;

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

exports.currentCandidate = async (req, res) => {
  const user = await Candidate.findById(req.user).exec();
  res.status(200).json(user);
};
