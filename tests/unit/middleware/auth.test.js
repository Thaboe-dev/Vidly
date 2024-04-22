const { User } = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');

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
    it('should populate req.user with a valid jwt', () => {
        const user = { 
            _id: new mongoose.Types.ObjectId().toHexString(), 
            isAdmin: true 
        };
        const token = new User(user).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next = jest.fn();

        auth(req, res, next);
        expect(req.user).toMatchObject(user);
    });
});