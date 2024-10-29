const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const changePasswordRoutes = (db, sendToCServer) => {
    router.post('/', [
        check('currentPassword').notEmpty().withMessage('현재 비밀번호를 입력하세요.'),
        check('newPassword').notEmpty().withMessage('새로운 비밀번호를 입력하세요.')
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { currentPassword, newPassword } = req.body;
        const { username } = req.user; // JWT에서 사용자 정보 추출

        // 데이터베이스에서 현재 비밀번호 확인
        const query = 'SELECT LoginPW FROM Owner WHERE RoomNO = ?';
        db.query(query, [username], (err, results) => {
            if (err) return res.status(500).json({ message: '서버 오류' });
            if (results.length == 0 || results[0].LoginPW !== currentPassword) {
                return res.status(401).json({ message: '현재 비밀번호가 일치하지 않습니다.' });
            }

            // 비밀번호 변경 로직 (새 비밀번호를 C 서버로 전송)
            const message =`WEB:room_${username}:change_PW:${newPassword}`;
            sendToCServer(message);

            res.json({ success: true, message: '비밀번호가 성공적으로 변경되었습니다.' });
        });
    });

    return router;
};

module.exports = changePasswordRoutes;

