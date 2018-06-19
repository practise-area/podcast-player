const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load models
const Library = require('../../models/Library');

// Load controllers
const libraryController = require('../../controllers/libraryController');

// GET api/library/ => Get current users library
router.get('/', passport.authenticate('jwt', { session: false }), libraryController.get_library);

// POST api/library/ => Create or Add podcast to current user library
router.post('/', passport.authenticate('jwt', { session: false }), libraryController.add_to_library);

module.exports = router;
