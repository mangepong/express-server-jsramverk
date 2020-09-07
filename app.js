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
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);
app.use('/reports/week', kmom);
app.use('/register', register);
app.use('/login', login);
app.use('/reports', reports);

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));