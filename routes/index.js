var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Välkommen till min backend i kursen jsramverk"
        }
    };

    res.json(data);
});

module.exports = router;