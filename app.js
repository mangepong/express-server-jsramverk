const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 1337;
const index = require('./routes/index');
const kmom = require('./routes/kmom');
const register = require('./routes/register');
const login = require('./routes/login');
const reports = require('./routes/reports');


app.use(cors());
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);
app.use('/reports/week', kmom);
app.use('/register', register);
app.use('/login', login);
app.use('/reports', reports);


// Start up server
var server = app.listen(port, () => console.log(`Backend API listening on port ${port}!`));

module.exports = server;
