const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const net = require('net'); // C 서버와 통신할 때 사용
const path = require('path');

const authRoutes = require('./routes/authRoutes'); // 로그인 및 인증 관련 라우트
const changePasswordRoutes = require('./routes/changePasswordRoutes'); // 비밀번호 변경 라우트
const openDoorRoutes = require('./routes/openDoorRoutes'); // 문 열기 라우트
const visitorLogRoutes = require('./routes/VisitorLogRoutes');
const visitorDetailRoutes = require('./routes/VisitorDetailRoutes');

const app = express();
const PORT = 3001;
const C_SERVER_HOST = '192.168.0.15'; //'192.168.0.15';
const C_SERVER_PORT = 9000;

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '../images')));


// Linux
const client = new net.Socket();
client.connect(C_SERVER_PORT, C_SERVER_HOST, () => {
      console.log('conneted to C server');
      const msg = `WEB`;
      client.write(msg);
});

// MySQL 연결 설정
const db = mysql.createConnection({
    host: '192.168.0.15',
    user: 'admin',
    password: '1234',
    database: 'SmartBuilding'
});




db.connect(err => {
    if (err) {
        console.error('MySQL connect error:', err.message);
    } else {
        console.log('MySQL conneted sucessfully!');
    }
});

// JWT 인증 미들웨어
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: '토큰이 필요합니다.' });

    jwt.verify(token, 'doorlock_secret', (err, user) => {
        if (err) return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
        req.user = user;
        next();
    });
};

// 라우트 설정
app.use('/api/auth', authRoutes(db));
app.use('/api/change-password', authenticateJWT, changePasswordRoutes(db, sendToCServer));
app.use('/api/open-door', authenticateJWT, openDoorRoutes(sendToCServer)); // 문 열기 라우트 추가
app.use('/api/visitors', visitorLogRoutes(db, authenticateJWT));
app.use('/api/visitor-details', visitorDetailRoutes(db));


// C 서버로 메시지 전송
function sendToCServer(message) {
    client.write(message);

    client.on('error', (err) => {
        console.error('C 서버와의 통신 중 오류 발생:', err.message);
    });

    client.on('close', () => {
        console.log('C 서버와의 연결이 닫혔습니다.');
    });
}

// 서버 실행
app.listen(PORT, () => {
    console.log(`Sever is running on ${PORT}`);
});

