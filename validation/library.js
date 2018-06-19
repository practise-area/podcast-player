const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLibraryInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.author = !isEmpty(data.author) ? data.author : '';
  data.feed = !isEmpty(data.feed) ? data.feed : '';
  data.image = !isEmpty(data.image) ? data.image : '';

  
  if(Validator.isEmpty(data.title)) {
    errors.email = 'Email field is required';
  }

  if(Validator.isEmpty(data.author)) {
    errors.password = 'Password field is required';
  }

  if(Validator.isEmpty(data.feed)) {
    errors.password = 'Password field is required';
  }

  if(Validator.isEmpty(data.image)) {
    errors.password = 'Password field is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }

}
