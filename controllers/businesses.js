const Business = require('../models/business');

module.exports = {
  index,
  show,
  new: newBusiness,
  create
};

function index(req, res) {
  Business.find({}, function (err, businesses) {
    res.render('businesses/index', { title: 'All Businesses', businesses });
  });
}

function show(req, res) {
  Business.findById((req.params.id), function (err, business) {
    res.render('businesses/show', { title: 'The Business', business });
  });
}

function newBusiness(req, res) {
  res.render('businesses/new', { title: 'Add Business' });
}

function create(req, res) {
  const business = new Business(req.body);
  business.save(function (err) {
    if (err) return res.redirect('/businesses/new');
    console.log(err);
    res.redirect('/businesses');
  });
}