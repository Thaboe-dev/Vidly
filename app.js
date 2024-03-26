const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Database Connection
mongoose.connect('mongodb://localhost:27017/vidly')
    .then(()=> console.log("Connected to MongoDB..."))
    .catch(err => console.log("Failed to connect to Database", err));

// Middleware
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/courses', customers)

//PORT
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}..`));