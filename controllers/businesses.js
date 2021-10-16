const Business = require('../models/business');

module.exports = {
    index,
}

function index(req, res) {
    Business.find({}, function (err, businesses) {
      res.render('businesses/index', { title: 'All Businesses', businesses });
    });
  } 