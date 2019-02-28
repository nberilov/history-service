const express = require('express');
const router = express.Router();

const pricesRouter = require('./prices');
const metricsRouter = require('./metrics');

router.use('/prices', pricesRouter);
router.use('/metrics', metricsRouter);

module.exports = router;
