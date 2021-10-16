const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Welcome to The Mocha Storehouse' });
});

router.get(
  '/auth/google',
  passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
  )
);

// Google OAuth callback route
router.get(
  '/oauth2callback',
  passport.authenticate(
    'google',
    {
      successRedirect: '/',
      failureRedirect: '/'
    }
  )
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
