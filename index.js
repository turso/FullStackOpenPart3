const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan(':method :url :res :status :response-time[4]'));

morgan.token('res', function(res) {
  return JSON.stringify(res.body);
});

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Martti Tienari',
    number: '040-123456',
    id: 2
  },
  {
    name: 'Arto Järvinen',
    number: '040-123456',
    id: 3
  },
  {
    name: 'Herra huu',
    number: '040-12334436',
    id: 4
  }
];

const date = new Date();

const listSize = persons.length;
const info = `
puhelinluettelossa on ${listSize} henkilön tiedot <br><br>
${date}
`;

// morgan.token('responseBody', function(req, res) {
//   return JSON.stringify({});
// });

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
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
  const randomNumb = Math.floor(Math.random() * 1000000 + 1);
  console.log(body);

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name is missing' });
  } else if (body.number === undefined) {
    return response.status(400).json({ error: 'number is missing' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: randomNumb
  };

  persons = persons.concat(person);

  res.json(person);
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);
