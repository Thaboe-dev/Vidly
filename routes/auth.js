const { User } = require('../models/user');
const config = require('config');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

// API Endpoints

// Create
router.post('/', async (req, res) => {
    // Input Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    res.send(token);
});


function validate(object){
    const schema = Joi.object({
        email: Joi.string().min(10).max(255).required().email(),
        password: passwordComplexity().required()
    });

    return result = schema.validate(object);
}

module.exports = router;
