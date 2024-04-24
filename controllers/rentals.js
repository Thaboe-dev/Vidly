const { Rental, validate } = require('../models/rentals');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');
const mongoose = require('mongoose');

// CREATE
exports.createRental = async (req, res) => {
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
}

// READ
exports.getAllRentals = async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
}

exports.getRental = async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send("Rental not found");

    res.send(rental);
}

// DELETE
exports.deleteRental = async (req, res) => {
    const rental = Rental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).send("Rental not found");

    res.send(rental);
}