var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/text.sqlite');


router.post('/', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        email,
        hash, (err) => {
            if (err) {
                res.status(400).json({
                    data: {
                        msg: "Could not create user: " + email
                    }
                });
            } else {
                res.status(201).json({
                    data: {
                        msg: "Created user: " + email
                    }
                });
            }
        });
    });

});

module.exports = router;