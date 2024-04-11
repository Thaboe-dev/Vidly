const {Customer, validate} = require('../models/customer');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

// API Endpoints

// READ
router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

router.get('/:id', async (req,res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");

    res.send(customer);
})

// CREATE
router.post('/', auth, async (req, res) => {
    // Input Validation
    const { error } = validate(req.body);
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
router.put('/:id', auth, async (req, res) => {
    // Input Validation
    const { error } = validate(req.body);
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