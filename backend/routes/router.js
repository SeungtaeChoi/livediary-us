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

router.get('/getData', (req, res) => {
    db.query("select * from `table`", (err, rows) => {
    if (!err) {
        res.send(rows);
    } else {
        console.log(`query error : ${err}`);
        res.send(err);
    }
    });
});

module.exports = router;