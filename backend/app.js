const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = 4000;

//정적파일
app.use(express.static(path.join(__dirname, '..', 'public/')));

//cors - 모두 허용
app.use(cors());

//라우팅
const user = require('./routes/user'); app.use('/user', user);
const task = require('./routes/task'); app.use('/task', task);

//실행
app.listen(PORT, () => {
    console.log(`Check out the app at http://localhost:${PORT}`);
});