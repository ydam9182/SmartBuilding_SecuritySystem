const express = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// 로그인 라우트 설정
const authRoutes = (db) => {
    router.post('/login', [
        check('username').notEmpty().withMessage('Username is required'),
        check('password').notEmpty().withMessage('Password is required')
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        const query = 'SELECT * FROM Owner WHERE RoomNO = ?';
        db.query(query, [username], (err, results) => {
            if (err) return res.status(500).json({ message: '서버 오류' });
            if (results.length === 0 || results[0].LoginPW !== password) {
                return res.status(401).json({ message: '잘못된 사용자명 또는 비밀번호' });
            }

            const user = results[0];
            const token = jwt.sign({ username, RoomNO: user.RoomNO }, 'doorlock_secret', { expiresIn: '1h' });
            res.json({ token, user: { RoomNO: user.RoomNO } });
        });
    });

    return router;
};

module.exports = authRoutes;

