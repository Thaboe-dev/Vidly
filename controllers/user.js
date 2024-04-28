const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

// CREATE
exports.createUser = async (req, res) => {
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
}

// READ
exports.getUser = async (req, res) => {

    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}

// UPDATE 
exports.updateUser = async (req, res) => {
    // Input Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, { new: true });

    if ((!user)) return res.status(404).send("User not found");
    res.send(user);
}

// DELETE
exports.deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if ((!user)) return res.status(404).send("User not found");
    res.send(user);
}