const express = require('express');

const server = express();
server.use(express.json());

let id = 2;

let games = [
  {
    id: 1,
    title: 'Test Game',
    genre: 'Action',
    releaseYear: 2019,
  },
];
server.get('/', (req, res) => {
  res.status(200).send('sanity check!');
});

server.get('/games', (req, res) => {
  res.status(200).send(games);
});

server.get('/games/:id', (req, res) => {
  const game = games.filter(g => g.id == req.params.id)[0];
  if (!game) {
    res.status(404).json({error: 'invalid id'})
  } else {
    res.status(200).json(game);
  }
})

server.delete('/games/:id', (req, res) => {
  const game = games.filter(g => g.id == req.params.id)[0];
  console.log(game);
  
  if(!game) {
    console.log('not');
    
    res.status(404).json({error: 'invalid id'});
  } else {
    games = games.filter(g => g.id != req.params.id);
    console.log(games);
    
    res.status(200).json({message: 'game deleted'})
  }
})

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;

  if (!title || !genre) {
    res.status(422).send({ error: 'Game must have a title and release year!' });
  } else {
    games.push({id: id++, ...req.body});
    res.status(201).send({ message: 'Game created' });
  }
});


module.exports = server;
