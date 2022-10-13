const express = require('express');

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

//Initializing app
const app = express();

//settingup database

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Databse connected'))
  .catch((err) => {
    console.log(err);
  });

// middlewares

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// Routes middleware

fs.readdirSync('./routes').map((r) =>
  app.use('/api', require('./routes/' + r))
);

// server listening

app.listen(process.env.PORT, () => [console.log('Listening to port 8000')]);
