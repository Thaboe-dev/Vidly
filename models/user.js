const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

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
        required: true
    }
}));

// Input Validation
function validateUser(object){
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(255),
        email: Joi.string().min(10).max(255).required().email(),
        password: passwordComplexity().required()
    });

    return result = schema.validate(object);
}

exports.User = User;
exports.validate = validateUser;

