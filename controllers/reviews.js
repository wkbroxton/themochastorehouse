const Business = require('../models/business');

module.exports = {
  create,
  delete: deleteReview
};

async function deleteReview(req, res) {
  const business = await Business.findOne({'reviews._id': req.params.id});
  const review = business.reviews.id(req.params.id);
  // Make sure that the review was created by the logged in user
  if (!review.user.equals(req.user._id)) return res.redirect(`/businesses/${business._id}`);
  review.remove();
  await business.save();
  res.redirect(`/businesses/${business._id}`);
}

function create(req, res) {
  Business.findById(req.params.id, function(err, business) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    business.reviews.push(req.body);
    business.save(function(err) {
      res.redirect(`/businesses/${business._id}`);
    });
  });
}