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
      const body = {
        title: 'Contra',
        releaseYear: 1986,
      };
      const response = await request(server).post('/games').send(body);
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
      console.log(response.body);
      
      expect(response.body).toEqual(expect.arrayContaining());
      
    } catch(err) {
      console.log(err);
    }
  })
})
