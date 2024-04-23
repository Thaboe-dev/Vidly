const request = require('supertest');
const { Rental } = require('../../models/rentals');
const { default: mongoose } = require('mongoose');
const { User } = require('../../models/user');
let server;
let rental;
let token;

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

describe('/api/returns', () => {
    let customerId;
    let movieId;

    beforeEach( async () => {
        server = require('../../app');

        customerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        rental = new Rental({
            customer: {
                _id: customerId,
                name: 'thaboe',
                phone: '0779685515'
            },
            movie: {
                _id: movieId,
                title: 'deadpool',
                dailyRentalRate: 2
            }
        });
        
        await rental.save();
    })

    afterEach(async () => {
        await Rental.deleteMany({ customer: { name: 'thaboe' } });
        await server.close();
    })

    it('should return 401 if client is not logged in', async () => {
        const res = await request(server)
            .post('/api/returns')
            .send({ customerId, movieId });

        expect(res.status).toBe(401);

    });

    it('should return 400 if customerId is not provided', async () => {
        token = new User().generateAuthToken();

        const res = await request(server)
                .post('/api/returns')
                .set('x-auth-token', token)
                .send({ movieId });

        expect(res.status).toBe(400);
    });

    it('should return 400 if movieId is not provided', async () => {
        token = new User().generateAuthToken();

        const res = await request(server)
                .post('/api/returns')
                .set('x-auth-token', token)
                .send({ customerId });

        expect(res.status).toBe(400);
    });
});