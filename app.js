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
const log = require('./routes/log');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongo = require("mongodb").MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/chatlog";




io.on('connection', function (socket) {
    socket.on('message', (msg, nick) => {
       socket.broadcast.emit('message-broadcast', msg, nick);
       var date = new Date();
       let options = {
                 hour: "2-digit", minute: "2-digit"
            };
       var time = date.toLocaleTimeString();

       async function saveLog(nick, msg, time) {
           const client = await mongo.connect(dsn);
           const db = await client.db();
           const col = await db.collection("users");
           const chatlog =
           {
               user: nick,
               msg: msg,
               time: time
           };

           await col.insertOne(chatlog);
       }
       saveLog(nick, msg, time);
    });
});



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
app.use('/log', log);

server.listen(port, () => console.log(`Backend API listening on port ${port}!`));
// Start up server
// var server = app.listen(port, () => console.log(`Backend API listening on port ${port}!`));

module.exports = server;
