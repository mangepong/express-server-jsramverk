var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/text.sqlite');


function getReports() {
    console.log("Updated reports");
    db.each("SELECT kmom, texts FROM reports", (err, row) => {
        if (err) {
            console.log("Could not find any kmom.");
        } else {
            router.get('/' + row.kmom, function(req, res) {
                const data = {
                    data: {
                        title: row.kmom,
                        text: row.texts
                    }
                };

                res.json(data);
            });
        }
    });

    // setTimeout(getReports, 5000);
}

getReports();

module.exports = router;
