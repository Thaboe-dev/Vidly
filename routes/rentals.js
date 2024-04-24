const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const {
    createRental,
    getAllRentals,
    getRental,
    deleteRental
} = require('../controllers/rentals');
const router = express.Router();


// API Endpoints

// Create
router.post('/', auth, createRental);

// Read
router.get('/', getAllRentals);

router.get('/:id', getRental);

`// Update
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

});`

// Delete
router.delete('/:id', [auth, admin, validateObjectId], deleteRental);

module.exports = router;