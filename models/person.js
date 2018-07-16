const mongoose = require('mongoose');

const url = 'mongodb://testi:testi96@ds163610.mlab.com:63610/fullstackopen-people';

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  };
};

const Person = mongoose.model('Peoples', personSchema);

module.exports = Person;
