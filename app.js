require('express-async-errors');
const winston = require('winston');
const config = require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/user');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('joi');
const error = require('./middleware/error');
Joi.objectId = require('joi-objectid')(Joi);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        winston.add(new winston.transports.File({ filename: 'logs.log' }))
    ],
  });

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    console.log(process.env);
    process.exit(1);
}

// Database Connection
mongoose.connect('mongodb://localhost:27017/vidly')
    .then(()=> console.log("Connected to MongoDB..."))
    .catch(err => console.log("Failed to connect to Database", err));

// Middleware
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/courses', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

//express error middleware
app.use(error);

//PORT
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}..`));