const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movies');
const router = express.Router();

// API Endpoints
// READ
router.get('/', getAllMovies);

router.get('/:id', getMovie)

// CREATE
router.post('/', auth, createMovie)

// UPDATE
router.put('/:id', [auth, admin, validateObjectId], updateMovie)

// DELETE
router.delete('/:id', [auth, admin, validateObjectId], deleteMovie)

module.exports = router;