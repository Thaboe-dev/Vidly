const {auth} = require('../controllers/auth');
const express = require('express');
const router = express.Router();


// API Endpoints

// Create
router.post('/', auth);

module.exports = router;
