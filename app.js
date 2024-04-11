const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db_conn')();
require('./startup/config')();
require('./startup/validation')();

//PORT
const port = process.env.PORT || 8080;
app.listen(port, () => winston.info(`listening on port ${port}..`));