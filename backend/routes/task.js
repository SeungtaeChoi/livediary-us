const express = require('express');
const os = require('os');
const router = express.Router();
const db = require('../connection');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('실행');
});

router.get('/api/getUsername', (req, res, next) => {
    res.send({ username: os.userInfo().username });
});

router.get('/getUser', (req, res) => {
    db.query("select * from `user`", (err, rows) => {
        if (err) {
            console.log(`query error : ${err}`);
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;