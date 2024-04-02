const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('Users', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        minlenth: 10,
        maxlength: 255,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    }
}));

// Input Validation
function validateUser(object){
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(255),
        email: Joi.string().min(10).max(255).required(),
        password: Joi.string().required().min(8).max(1024)
    });

    return result = schema.validate(object);
}

exports.User = User;
exports.validate = validateUser;

