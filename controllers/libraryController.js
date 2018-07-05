const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load models
const Library = require("../models/Library");
const User = require("../models/User");

const validateLibraryInput = require("../validation/library");

// GET api/library/ => Get current users library
exports.get_library = (req, res) => {
  const errors = {};
  Library.findOne({ user: req.user.id })
    .then(library => {
      if (!library) {
        errors.nolibrary = "There is no library for this user.";
        return res.status(404).json(errors);
      }
      res.json(library);
    })
    .catch(err => res.status(404).json(err));
};

// POST api/library/ => Create or Add podcast to current user library
exports.add_to_library = (req, res) => {
  const { errors, isValid } = validateLibraryInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const podcastFields = {};
  podcastFields.user = req.user.id;

  podcastFields.podcasts = {};
  if (req.body.title) podcastFields.podcasts.title = req.body.title;
  if (req.body.author) podcastFields.podcasts.author = req.body.author;
  if (req.body.feed) podcastFields.podcasts.feed = req.body.feed;
  if (req.body.image) podcastFields.podcasts.image = req.body.image;

  Library.findOne({ user: req.user.id }).then(library => {
    if (library) {
      const newPodcast = {
        title: req.body.title,
        author: req.body.author,
        feed: req.body.feed,
        image: req.body.image
      };
      const errors = {};

      const feedIndex = library.podcasts
        .map(pod => pod.feed)
        .indexOf(req.body.feed);
      if (feedIndex >= 0) {
        errors.podcast = "Podcast is already in your library.";
        return res.status(400).json(errors);
      } else {
        library.podcasts.unshift(newPodcast);
        library.save().then(library => res.json(library));
      }
    } else {
      new Library(podcastFields).save().then(library => res.json(library));
    }
  });
};

// DELETE api/library => Remove a SINGLE PODCAST from library
exports.delete_from_library = (req, res) => {
  Library.findOne({ user: req.user.id })
    .then(library => {
      const removeIndex = library.podcasts
        .map(item => item.feed)
        .indexOf(req.query.feed);

      library.podcasts.splice(removeIndex, 1);
      library.save().then(library => res.json(library));
    })
    .catch(err => res.status(404).json(err));
};
