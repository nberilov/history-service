const express = require('express');

const PriceController = require('../controllers/prices');
const wrapAsync = require('../utils/wrap-async');

const router = express.Router();

router.get('/', wrapAsync(PriceController.index));

module.exports = router;
