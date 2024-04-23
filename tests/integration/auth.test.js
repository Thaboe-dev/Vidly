const request = require('supertest');
const { Genre } = require('../../models/genres');
const { User } = require('../../models/user');
let server;

//mock functions
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
  

describe('auth middleware', () => {
    let token;

    beforeEach(() => {  
        server = require('../../app'); 
        token = new User().generateAuthToken();
    });
    afterEach(async () => { 
        await Genre.deleteMany({ name: 'genre1' });
        await server.close();
           
    });

    const exec = () => {
        return request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: 'genre1' });
    }

    it('should return 401 if no token is provided', async () => {
        token = '';

        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'invalid';

        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });

});