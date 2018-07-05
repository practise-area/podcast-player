const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require ('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load models
const User = require('../../models/User');

// Load controllers
const userController = require('../../controllers/userController');

// POST api/users/register => Register new users
router.post('/register', userController.user_register);

// POST api/users/login => Login user (returning token)
router.post('/login', userController.user_login);

// POST api/users/current => Return current user
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;
