// routes/VisitorLogRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (db, authenticateJWT) => {
    // 방문자 로그 목록 가져오기
    router.get('/', authenticateJWT, (req, res) => {
        const { RoomNO } = req.user;

        const query = 'SELECT eventID, DATE_FORMAT(time, "%Y.%m.%d %H:%i:%s") as time, Img_Path, RoomNO FROM Stranger WHERE RoomNO = ? ORDER BY eventID DESC';
        
        db.query(query, [RoomNO], (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: '방문자 로그를 가져오는 중 오류 발생', error: err });
            }
            res.json({ success: true, visitors: results });
        });
    });

    return router;
};

