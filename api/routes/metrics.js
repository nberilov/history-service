const express = require('express');
const client = require('prom-client');

const router = express.Router();

client.collectDefaultMetrics({ timeout: 5000 });

router.get('/', (req, res) => {
    const { register } = client;

    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
});

module.exports = router;
