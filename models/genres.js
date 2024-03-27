const Joi = require('joi');
const mongoose = require('mongoose');

// Schema and modelling
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateInput(object) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return result = schema.validate(object);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateInput;