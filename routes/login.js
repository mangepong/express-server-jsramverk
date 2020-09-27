var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");
// const db = new sqlite3.Database('./db/text.sqlite');

router.post('/', function(req, res) {
    const jwt = require('jsonwebtoken');

    const email = req.body.email;
    const password = req.body.password;

    db.get("SELECT password FROM users WHERE email=?", [email], (err, row) => {
        if (err) {
            res.status(400).json({
                data: {
                    msg: "Could not find user: " + email
                }
            });
        } else {
            bcrypt.compare(password, row.password, function(err, ans) {
                if (ans) {
                    const payload = { email: email };
                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});

                    res.status(201).json({
                        jwt_token: token
                    });
                } else {
                    res.status(400).json({
                        data: {
                            msg: "Error during login"
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
