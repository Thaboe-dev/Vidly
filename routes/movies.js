const express = require('express');
const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genres');
const auth = require('../middleware/auth');
const router = express.Router();

// API Endpoints
// READ
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.get('/:id', async (req,res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");

    res.send(movie);
})

// CREATE
router.post('/', auth, async (req, res) => {
    // Input Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    // posting to the database
    try {
        await movie.save();
        res.send(movie);
    }
    catch (ex) {
        res.send(ex.message);
    }
})

// UPDATE
router.put('/:id', auth, async (req, res) => {
    // Input Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
          },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

    // if invalid ID
    if (!movie) return res.status(404).send("Movie not found");

    res.send(movie);
})

// DELETE
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    // if invalid ID
    if (!movie) return res.status(404).send("Movie not found");

    res.send(movie);
})

module.exports = router;