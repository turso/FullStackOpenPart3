const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(cors());
app.use(express.static('build'));

app.use(bodyParser.json());
app.use(morgan(':method :url :res :status :response-time[4]'));

morgan.token('res', function(res) {
  return JSON.stringify(res.body);
});

const formatPerson = person => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  };
};

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people.map(formatPerson));
    mongoose.connection.close();
  });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(formatPerson(person));
  });
});

app.get('/info', (req, res) => {
  res.send(info);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  // const randomNumb = Math.floor(Math.random() * 1000000 + 1);
  console.log(body);

  if (body.name === undefined) {
    return res.status(400).json({ error: 'name is missing' });
  } else if (body.number === undefined) {
    return res.status(400).json({ error: 'number is missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number
    // id: randomNumb
  });

  person.save().then(savedPerson => {
    res.json(formatPerson(savedPerson));
  });
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);
