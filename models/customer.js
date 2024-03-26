const mongoose = require('mongoose');
const Joi = require('joi');


// model and schema
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
    }
}));

// validate Function
function validateInput(object) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean(),
        phone: Joi.number().min(10).required()
    });
    return result = schema.validate(object);
}

exports.Customer = Customer;
exports.validate = validateInput;
