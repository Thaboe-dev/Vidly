const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// model and schema
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: Boolean,
    phone: {
        type: String,
        required: true,
        minlength: 10,
    }
});

const Customer = mongoose.model('Customer', customerSchema);

// validate Function
function validateInput(object) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.number().min(10).required()
    });
    return result = schema.validate(object);
}

// API Endpoints

// READ
router.get('/', async (req, res) => {
    const customer = await Customer.find();
    res.send(customer);
});

router.get('/:id', async (req,res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");

    res.send(customer);
})

// CREATE
router.post('/', async (req, res) => {
    // Input Validation
    const { error } = validateInput(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone
    });

    // posting to the database
    try {
        const result = await customer.save();
        res.send(result);
    }
    catch (ex) {
        res.send(ex.message);
    }
})

// UPDATE
router.put('/:id', async (req, res) => {
    // Input Validation
    const { error } = validateInput(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });

    // if invalid ID
    if (!customer) return res.status(404).send("Customer not found");

    res.send(customer);
})

// DELETE
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    // if invalid ID
    if (!customer) return res.status(404).send("Customer not found");

    res.send(customer);
})

module.exports = router;