const express = require('express');
const os = require('os');
const router = express.Router();
const db = require('../connection');

//조회
router.get('/:id', (req, res) => {
    db.query(`select * from user where id = '${req.params.id}'`, (err, rows) => {

        //실패 시
        if (err) { res.send(`error_code:${err}`); }

        //성공 시
        res.send(rows);
    });
});

module.exports = router;