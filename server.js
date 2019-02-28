const app = require('./app');
const config = require('./api/config');

app.listen(config.port, () => {
    console.log(`History service listening on port ${config.port}`);
});
