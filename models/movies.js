const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genres')

// Model and Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movies', movieSchema);

// Input validation
function validateInput(object) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required().trim(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required().min(0).max(255),
        dailyRentalRate: Joi.number().required().min(0).max(255),
    });
    return result = schema.validate(object);
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validate = validateInput;