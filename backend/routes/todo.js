const express = require('express');
const os = require('os');
const router = express.Router();
const db = require('../connection');
const todoQuery = require('../querys/todo');
require('dotenv').config();

router.post('/', (req, res) => {
    const params = req.body;

    const sql = todoQuery.insert(params);
    db.query(sql, (err, rows) => {

        //서버 에러
        res.status(500);
        if (err) { res.json({ path: 'post /todo', error: 'query_error', msg: err }); }

        //성공
        res.status(200);
        res.json({ path: 'post /todo' });
    });
});

module.exports = router;