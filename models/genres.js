const Joi = require('joi');
const mongoose = require('mongoose');

// Schema
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }
}));

function validateInput(object) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return result = schema.validate(object);
}

exports.Genre = Genre;
exports.validate = validateInput;