const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { default: mongoose } = require('mongoose');
const validateObjectId = require('../middleware/validateObjectId');
const { createGenre, getAllGenres, getGenre, updateGenre, deleteGenre } = require('../controllers/genres');

// Building a simple CRUD API

// CREATE
router.post('/', auth, createGenre);

// READ
router.get('/', getAllGenres);

router.get('/:id', validateObjectId, getGenre);

// UPDATE
router.put('/:id', [auth, admin, validateObjectId], updateGenre);

// DELETE
router.delete('/:id', [auth, admin, validateObjectId], deleteGenre)

module.exports = router;

