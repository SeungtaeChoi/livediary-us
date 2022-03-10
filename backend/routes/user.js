const express = require('express');
const os = require('os');
const router = express.Router();
const db = require('../connection');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/:id', (req, res) => {
    let sql = `select * from user where id = '${req.params.id}'`;

    db.query(sql, (err, rows) => {
        //쿼리 실패 시
        if (err) { res.status(500).send({ error: err }); }
        //쿼리 성공 시
        res.send(rows);
    });
});

router.post('/login', (req, res) => {
    const userId = req.body.userId;
    const userPassword = req.body.userPassword;

    let sql = `select * from user where id = '${userId}'`;
    db.query(sql, (err, rows) => {

        //서버 에러
        res.status(500);
        if (err) { res.json({ path: '/user/login', error: 'query_error', msg: err }); }
        if (rows.length > 1) { res.json({ path: '/user/login', error: 'not_unique', msg: '' }); }

        //클라이언트 에러
        res.status(400);
        if (rows.length === 0) { res.json({ path: '/user/login', error: 'invalid_user', msg: '' }); }

        //성공
        res.status(200);

        //토큰 발급
        const SECRET_KEY_FOR_JWT = process.env.SECRET_KEY_FOR_JWT;
        const token = jwt.sign(
            {
                user_id: rows[0].id
            },
            SECRET_KEY_FOR_JWT,
            {
                expiresIn: '1h'
            }
        );
        res.status(201).json({path: '/user/login', token:token });

        //토큰 전달
        res.json(rows);

    });



});

module.exports = router;