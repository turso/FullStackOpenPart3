const mongoose = require('mongoose');

const url = 'mongodb://testi:testi96@ds163610.mlab.com:63610/fullstackopen-people';

mongoose.connect(url);

const Person = mongoose.model('Peoples', {
  name: String,
  number: String
});

module.exports = Person;
