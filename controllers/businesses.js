const business = require('../models/business');
const Business = require('../models/business');

module.exports = {
  index,
  show,
  new: newBusiness,
  create,
  delete: deleteBusiness,
  edit,
  update,
  addFav,
  viewFavs
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
  business.user = req.user._id; // How we assigned ownwership to the Business to specific User
  business.save(function (err) {
    if (err) return res.redirect('/businesses/new');
    console.log(err);
    res.redirect('/businesses');
  });
}

function deleteBusiness(req, res) {
  Business.findByIdAndDelete(req.params.id, function(err){
    res.redirect("/businesses");
  });
}

function edit(req, res) {
  Business.findById(req.params.id, function (err, business) {
    if (err) {
      res.redirect(`/businesses/${req.params.id}`);
    }
    res.render("businesses/edit", { business, title: "Edit Business" });
  });
}

function update(req, res) {
  Business.findByIdAndUpdate(req.params.id, req.body, function (err, business) {
    if (err) {
      res.render("businesses/edit", { business, title: "Edit Business" });
    }
    res.redirect(`/businesses/${business._id}`);
  });
}

function addFav(req, res) {
  Business.findById(req.params.id, function(err, business){
    business.favs.push(req.user._id);
    business.save(function(err){
      res.redirect(`/businesses/${business._id}`);
    });
  });
}

function viewFavs(req, res) {
  Business.find({"favs._id": req.user._id }, function(err, businesses){
    console.log(businesses);
    res.render('businesses/index', { title: 'My Favorite Businesses', businesses });
  });
}