const {Customer, validate} = require('../models/customer');

// CREATE
exports.createCustomer = async (req, res) => {
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
}

// READ
exports.getAllCustomers = async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
}

exports.getCustomer = async (req,res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");

    res.send(customer);
}

// UPDATE
exports.updateCustomer = async (req, res) => {
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
}

// DELETE
exports.deleteCustomer = async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    // if invalid ID
    if (!customer) return res.status(404).send("Customer not found");

    res.send(customer);
}