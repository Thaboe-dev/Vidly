const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

// API Endpoints

// Create
router.post('/', async (req, res) => {
    // Input Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, [
        'name',
        'email',
        'password'
    ]));

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // posting to the database
    try {
        await user.save();
        
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
    }
    catch (ex) {
        res.send(ex.message);
    }
});

// Read
router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    res.send(user);
});

// Update
router.put('/:id', async (req, res) => {
    // Input Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, { new: true });

    if ((!user)) return res.status(404).send("User not found");
    res.send(user);
});

// Delete
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if ((!user)) return res.status(404).send("User not found");
    res.send(user);
});

module.exports = router;
