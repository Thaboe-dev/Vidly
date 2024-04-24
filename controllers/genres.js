const {Genre, validate} = require('../models/genres');

exports.createGenre = async (req, res) => {
    // Input Validation
    const { error } = validate(req.body);
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

}

exports.getAllGenres = async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
}

exports.getGenre = async (req, res) => {

    const genre = await Genre.findById(req.params.id);

    // if invalid ID
    if (!genre) return res.status(404).send('Genre not found');

    //return object
    res.send(genre);
}

exports.updateGenre = async (req, res) => {
    // Input Validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })
    // if invalid ID
    if (!genre) return res.status(404).send('Genre not found'); 

    // Update
    res.send(genre);
}

exports.deleteGenre = async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    // if invalid ID
    if (!genre) return res.status(404).send('Genre not found');

    // Response to the client
    res.send(genre);
}