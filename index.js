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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(Person.format));
    })
    .catch(error => {
      console.log(error);
      response.status(404).end();
    });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(Person.format(person));
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({ error: 'malformatted id' });
    });
});

app.get('/info', (req, res) => {
  res.send(info);
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(400).send({ error: 'malformatted id' });
    });
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  console.log(body);

  if (body.name === undefined) {
    return res.status(400).json({ error: 'name is missing' });
  } else if (body.number === undefined) {
    return res.status(400).json({ error: 'number is missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(savedPerson => {
    res.json(Person.format(savedPerson));
  });
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);
