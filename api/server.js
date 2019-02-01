const express = require('express');

const server = express();
server.use(express.json());

const games = [
  {
    title: 'Test Game',
    genre: 'Action',
    releaseYear: 2019,
  },

];
server.get('/', (req, res) => {
  res.status(200).send('sanity check!');
})

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  
  if (!title || !genre) {
    res.status(422).send({error: 'Game must have a title and release year!'});
  } else {
    games.push(req.body);
    res.status(201).send({message: 'Game created'})
  }

})

module.exports = server;
