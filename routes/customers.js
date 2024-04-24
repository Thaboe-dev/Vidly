const auth = require('../middleware/auth');
const express = require('express');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const { 
    createCustomer, 
    getAllCustomers, 
    getCustomer, 
    updateCustomer, 
    deleteCustomer 
} = require('../controllers/customers');
const router = express.Router();

// API Endpoints

// READ
router.get('/', getAllCustomers);

router.get('/:id', getCustomer);

// CREATE
router.post('/', auth, createCustomer);

// UPDATE
router.put('/:id', [auth, admin, validateObjectId], updateCustomer);

// DELETE
router.delete('/:id', [auth, admin, validateObjectId], deleteCustomer);

module.exports = router;