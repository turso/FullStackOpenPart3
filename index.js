const express = require('express');
const app = express();

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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  res.send(info);
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);
