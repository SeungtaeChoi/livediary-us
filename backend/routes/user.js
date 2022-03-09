const express = require('express');
const os = require('os');
const router = express.Router();
const db = require('../connection');

// 조회
router.get('/:id', (req, res) => {
    let sql = `select * from user where id = '${req.params.id}'`;

    db.query(sql, (err, rows) => {
        //실패 시
        if (err) { res.status(500).send(`error_code:${err}`); }
        //성공 시
        res.send(rows);
    });
});

// 로그인

module.exports = router;