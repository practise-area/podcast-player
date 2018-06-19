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


// @route     GET api/users/test
// @desc      Users test route
// @ access   Public
router.get('/test', userController.user_test);


// @route     POST api/users/register
// @desc      Register new users
// @ access   Public
router.post('/register', userController.user_register);




// @route     POST api/users/login
// @desc      Login user (returning token)
// @ access   Public
router.post('/login', userController.user_login);

// @route     POST api/users/current
// @desc      Return current user
// @ access   Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });

})











module.exports = router;
