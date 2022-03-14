const express = require('express');
const app = express();
const PORT = 4000;
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./connection');

//정적파일
app.use(express.static(path.join(__dirname, '..', 'public/')));

//cors - 모두 허용
app.use(cors());

//post 허용
app.use(bodyParser.urlencoded({ extended: true })) //post - req.body 쓰기
app.use(bodyParser.json()) //post - req.body 쓰기

//라우팅
const user = require('./routes/user'); app.use('/user', user);
const task = require('./routes/task'); app.use('/task', task);

//실행
app.listen(PORT, () => {
    setInterval(function () {
        db.query('SELECT 1');
    }, 5000);
    console.log(`Check out the app at http://localhost:${PORT}`);
});