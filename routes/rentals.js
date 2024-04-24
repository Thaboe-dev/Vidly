const express = require('express');
const { Rental, validate } = require('../models/rentals');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();


// API Endpoints

// Create
router.post('/', auth, async (req, res) => {
    //for transactions
    const session = await mongoose.startSession();

    // Input Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Customer with the given ID not found");
    
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Movie with the given ID not found");
    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    session.startTransaction();
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    })

    const myrental = await Rental.findOne({'customer._id': customer._id, 'movie._id':movie._id });

    if (!myrental ) {
    result = await rental.save();
    movie.numberInStock--;
    await movie.save();
    }
    else {
    console.log(myrental.movie._id);
    session.abortTransaction();
    return res.status(400).send('you have already rent the movie');
    }

    session.commitTransaction();
    session.endSession();
    res.send(result);

    // posting to the DB
    `try{
        rental = await rental.save();
        movie.numberInStock--;
        movie = await movie.save();

        session.commitTransaction();
        res.send(rental);
    }
    catch (ex) {
        await session.abortTransaction();
        res.status(500).send("Something went wrong.");
    }

    session.endSession();`
});

// Read
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send("Rental not found");

    res.send(rental);
});

// Update
router.put('/:id', [auth, admin, validateObjectId], async (req, res) => {
    // Input Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    const movie = await Movie.findById(req.body.movieId);
    if (!customer) return res.status(404).send("Customer with the given ID not found");
    if (!movie) return res.status(404).send("Movie with the given ID not found");

    const rental = await Rental.findByIdAndUpdate(req.params.id, {
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            genre: movie.genre.name
        },
        price: req.body.price,
        date: req.body.date
    });

    // if invalid ID
    if (!rental) return res.status(404).send("Rental not found");

    res.send(rental);

});

// Delete
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const rental = Rental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).send("Rental not found");

    res.send(rental);
});

module.exports = router;