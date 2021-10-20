const express = require('express');
const router = express.Router();
const businessesCtrl = require('../controllers/businesses');
const isLoggedIn = require('../config/auth');

router.get('/', businessesCtrl.index);
router.get('/new', isLoggedIn, businessesCtrl.new);
router.get('/:id', businessesCtrl.show);
router.post('/', isLoggedIn, businessesCtrl.create);
router.delete('/:id', businessesCtrl.delete);
router.get('/:id/edit', businessesCtrl.edit);
router.put('/:id', businessesCtrl.update);

module.exports = router;
