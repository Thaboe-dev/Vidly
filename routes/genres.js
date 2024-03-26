const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



// Schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }
});

//modelling
const Genre = mongoose.model('Genre', genreSchema);

function validateInput(object) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return result = schema.validate(object);
}

// Building a simple CRUD API

// CREATE
router.post('/', async (req, res) => {
    // Input Validation
    const { error } = validateInput(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const genre = new Genre({ name: req.body.name });
    // posting to the database
    try {
        const result = await genre.save();
        res.send(result);
    }
    catch (ex){
        res.send(ex.message);
    }

})

// READ
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    // if invalid ID
    if (!genre) return res.status(404).send('Genre not found');

    //return object
    res.send(genre);
})

// UPDATE
router.put('/:id', async (req, res) => {
    // Input Validation
    const { error } = validateInput(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })
    // if invalid ID
    if (!genre) return res.status(404).send('Genre not found'); 

    // Update
    res.send(genre);
});

// DELETE
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    // if invalid ID
    if (!genre) return res.status(404).send('Genre not found');

    // Response to the client
    res.send(genre);
})

module.exports = router;
