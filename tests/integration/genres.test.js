const request = require('supertest');
const { Genre } = require('../../models/genres');
const { User } = require('../../models/user');
let server;

jest.mock('config', () => {
    const mockConfig = {
      jwtPrivateKey: 'yourJWTPrivateKeyForTesting',
      db: 'mongodb://localhost:27017/vidly_tests'
      // Add other configuration properties as needed for your tests
    };
  
    return {
      get: (key) => mockConfig[key]
    };
  });  
  

describe('/api/genres', () => {
    beforeEach(() => {  server = require('../../app'); });
    afterEach(async () => { 
        server.close();
        await Genre.deleteMany({ name: 'genre1' });
        await Genre.deleteMany({ name: 'genre2' });    
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);

            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();
       
            const res = await request(server).get('/api/genres/' + genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return status 404 if given genre ID is not valid', async () => {
       
            const res = await request(server).get('/api/genres/12334');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        it('should return 401 if client is not logged in', async () => {
            const res = await request(server)
                .post('/api/genres')
                .send({ name: 'genre1' });

            expect(res.status).toBe(401);
        });

        it('should return 400 if genre is invalid ie less than 5 characters', async () => {
            const token = new User().generateAuthToken();

            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: 'gen' });

            expect(res.status).toBe(400);
        });

        it('should return 400 if genre is invalid ie more than 50 characters', async () => {
            const token = new User().generateAuthToken();

            const name = new Array(52).join('a');
            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: name});

            expect(res.status).toBe(400);
        });
    });
});
