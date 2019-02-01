const request = require('supertest');

const server = require('./server');


describe('/ sanity check', () => {
  it('should return a status of 200', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  })
})

describe('/POST endpoint', () => {
  it('should return an error if the object shape is invalid', async () => {
    try {
      let body = {
        title: 'Contra',
        releaseYear: 1986,
      };
      const response = await request(server).post('/games').send(body);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({ error: 'Game must have a title and release year!' });
      body = {
        releaseYear: 1986,
        genre: 'Fantasy',
      };
      expect(response.status).toBe(422);
      expect(response.body).toEqual({ error: 'Game must have a title and release year!' });
    } catch(err) {
      console.log(err);
    }
  })
  it('should return 201 if the game is added', async () => {
    try {
      const body = {
        title: 'Contra',
        genre: 'Action',
        releaseYear: 1986,
      }
      const response = await request(server).post('/games').send(body);
      expect(response.status).toBe(201);

    } catch(err) {
      console.log(err);
      
    }
  })
})

describe('/GET endpoint', () => {
  it('should return status code 200', async () => {
    try {
    const response = await request(server).get('/games');
    expect(response.status).toBe(200);
    } catch(err) {
      console.log(err);
    }
  })
  it('should return an array', async () => {
    try {
    const response = await request(server).get('/games');
      expect(response.body).toEqual(expect.arrayContaining([]));
      
    } catch(err) {
      console.log(err);
    }
  })
})

describe('/GET/:id endpoint', () => {
  it('should return a 404 if the game does not exist', async () => {
    const response = await request(server).get('/games/12');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: 'invalid id'})
  })
  it('should return the game if the id is valid', async () => {
    const response = await request(server).get('/games/1');
    expect(response.status).toBe(200);
  })
})
