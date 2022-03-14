const express = require('express');
const os = require('os');
const router = express.Router();
const db = require('../connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userQuery = require('../querys/user');
require('dotenv').config();

// router.get('/:id', (req, res) => {
//     let sql = `select * from user_a where id = '${req.params.id}'`;

//     db.query(sql, (err, rows) => {
//         //쿼리 실패 시
//         if (err) { res.status(500).json({ error: err }); }
//         //쿼리 성공 시
//         res.send(rows);
//     });
// });

router.post('/', (req, res) => {
    const userId = req.body.userId;
    const userPassword = req.body.userPassword;

    //정규식체크
    const checkId = /^(?=.*[a-z0-9]).{6,30}$/;
    const checkPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,30}$/;
    if (!checkId.test(userId)) {
        res.status(400).json({ path: 'post /', error: 'check_id', msg: 'checkId' });
    };
    if (!checkPassword.test(userPassword)) {
        res.status(400).json({ path: 'post /', error: 'check_password', msg: 'checkPassword' });
    }

    //키워드체크
    const banKeyword = ['admin', 'administrator', 'guest', 'manager', 'developer'];
    if(banKeyword.includes(userId)){
        res.status(400).json({ path: 'post /', error: 'ban_keyword', msg: '' });
    } else {

        //중복체크
        const sql1 = userQuery.select({ userId: req.body.userId });
        db.query(sql1, (err, rows) => {
    
            //서버 에러
            res.status(500);
            if (err) { res.json({ path: 'post /', error: 'query_error1', msg: err }); }
    
            //클라이언트 에러
            res.status(400);
            if (rows.length > 0) { res.json({ path: 'post /', error: 'exist', msg: '' }); } //이미 계정이 존재함.
        });
    
        //회원가입
        bcrypt.genSalt(5, (err, salt) => {
    
            //서버 에러
            if (err) { res.status(500).json({ path: 'post /user', error: 'query_error2', msg: err }); }
    
            //비밀번호 암호화
            bcrypt.hash(userPassword, salt, function (err, hashedPassword) {
    
                let sql2 = `insert into user (id, password) values ('${userId}', '${hashedPassword}');`;
    
                db.query(sql2, (err, rows) => {
    
                    //서버 에러
                    res.status(500);
                    if (err) { res.json({ path: 'post /', error: 'query_error3', msg: err }); }
    
                    //성공
                    res.status(201);
                    res.json({ path: 'post /' });
                });
            })
        });
    }


});

router.post('/login', (req, res) => {
    const userId = req.body.userId;
    const userPassword = req.body.userPassword;

    const sql = userQuery.select({ userId: userId });
    db.query(sql, async (err, rows) => {

        //서버 에러
        res.status(500);
        if (err) { res.json({ path: 'post /user/login', error: 'query_error', msg: err }); }
        if (rows.length > 1) { res.json({ path: 'post /user/login', error: 'not_unique', msg: '' }); } //2개 이상 조회됨

        //클라이언트 에러
        res.status(400);
        if (rows.length === 0) { res.json({ path: 'post /user/login', error: 'invalid_user', msg: '' }); } //조회 결과 없음
        const match = await bcrypt.compare(userPassword, rows[0].password);
        if (!match) { res.json({ path: 'post /user/login', error: 'not_match_password', msg: '' }); } //비밀번호가 틀림

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
                expiresIn: '1d'
            }
        );
        res.status(201).json({ path: 'post /user/login', token: token, user: { id: userId, insert_dt: rows[0].insert_dt } });

        //토큰 전달
        res.json(rows);

    });
});

router.post('/verify', (req, res) => {
    const userId = req.body.userId;
    const accessToken = req.body.accessToken;
    const SECRET_KEY_FOR_JWT = process.env.SECRET_KEY_FOR_JWT;

    jwt.verify(accessToken, SECRET_KEY_FOR_JWT, function (err, decoded) {
        if (err) {
            res.status(401).json({ path: 'post /user/verify', error: 'expire', msg: err }); //토큰 만료

            if (decoded.user_id !== userId) {
                res.status(401).json({ path: 'post /user/verify', error: 'unauthorized', msg: `아이디가 다름 ${decoded.user_id} ${userId}` }); //유저가 다름
            }
        }
    });

    res.status(200).json({ path: 'post /user/verify' });
});

module.exports = router;