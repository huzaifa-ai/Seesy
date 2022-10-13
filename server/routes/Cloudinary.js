const express = require('express');
const router = express.Router();
const { uploadEmployeerVideo } = require('../controllers/Cloudinary');

router.post('/uploadEmployeerVideo', uploadEmployeerVideo);

module.exports = router;
