const mongoose = require('mongoose');

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!

mongoose.connect(url);

const Person = mongoose.model('People', {
  name: String,
  number: String
});

function personSave(name, phone) {
  const person = new Person({
    name: name,
    number: phone
  });

  person.save().then(result => {
    console.log(`Lisätään henkilö ${name} ${phone}`);
    mongoose.connection.close();
  });
}

function personList() {
  Person.find({}).then(result => {
    console.log('puhelinluettelo:');
    result.forEach(person => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}

if (process.argv[2] && process.argv[3]) {
  personSave(process.argv[2], process.argv[3]);
} else {
  personList();
}
