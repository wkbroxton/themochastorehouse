const express = require('express');
const router = express.Router();
const businessesCtrl = require('../controllers/businesses');
const isLoggedIn = require('../config/auth');

module.exports = router;
