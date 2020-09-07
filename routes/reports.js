var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwt_secret = require('../jwt_secret');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/text.sqlite');

router.post('/',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => addReport(res, req.body));


    function checkToken(req, res, next) {
        const jwt = require('jsonwebtoken');
        const token = req.headers['x-access-token'];

        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                res.status(400).json({
                    data: {
                        msg: "Error: Could not verify session."
                    }
                });
            } else {
                res.status(201).json({
                    data: {
                        msg: "User verified!"
                    }
                });
                next();
            }

        });
    }

    function addReport(res, req) {

        const kmom = req.kmom;
        const texts = req.texts

        db.run("INSERT INTO reports (kmom, texts) VALUES (?, ?)",
        kmom,
        texts);
    }




module.exports = router;