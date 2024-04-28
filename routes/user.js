const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const {
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/user');

// API Endpoints

// Create
router.post('/', createUser);

// Read
`router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});`

router.get('/me', auth, getUser);

// Update
router.put('/me', auth, updateUser);

// Delete
router.delete('/:id', [auth, validateObjectId], deleteUser);

module.exports = router;
