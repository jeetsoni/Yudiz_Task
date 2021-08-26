const express = require('express');
const router = new express.Router();
const User = require('../models/user');

const { register, login, home } = require('../controllers/user');
const { protect } = require('../middleware/auth');

router.route('/').post(register);
router.post('/login', login);
router.get('/home', protect, home);

module.exports = router;
