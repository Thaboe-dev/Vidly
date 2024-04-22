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
        await Genre.deleteMany({ name: 'genre1' });
        await Genre.deleteMany({ name: 'genre2' }); 
        server.close();   
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

        let token;
        let name;

        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: name});
        }

        beforeEach(() => { 
            token = new User().generateAuthToken(); 
            name = 'genre1';
        })

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if genre is invalid ie less than 5 characters', async () => {
            name = '1234';
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if genre is invalid ie more than 50 characters', async () => {

            name = new Array(52).join('a');
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the genre if it is valid', async () => {

            await exec();
            const genre = await Genre.find({ name: 'rom-com' });

            expect(genre).not.toBeNull();
        });

        it('should return the genre if it is valid', async () => {
            
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body.name).toBe('genre1');
        });
    });
});
