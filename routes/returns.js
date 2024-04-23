const express = require('express');
const { Rental, validate } = require('../models/rentals');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const admin = require('../middleware/admin');
const router = express.Router();


router.post('/', auth, async (req, res) => {
    if (!req.body.customerId) return res.status(400).send('Customer ID nor provided');
    if (!req.body.movieId) return res.status(400).send('Movie ID nor provided');

    res.status(401).send('Unauthorized');
});

module.exports = router;