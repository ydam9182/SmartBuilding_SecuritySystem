// routes/VisitorDetailRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // 특정 방문자 로그 가져오기
    router.get('/:id', (req, res) => {
        const visitorId = req.params.id;
        const query = 'SELECT DATE_FORMAT(time, "%Y.%m.%d %H:%i:%s") as time, Img_Path, RoomNO FROM Stranger WHERE eventID = ?';
        db.query(query, [visitorId], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: '방문자 로그를 가져오는 중 오류 발생', error: err });
            }
            if (result.length === 0) {
                return res.status(404).json({ success: false, message: '방문자 로그를 찾을 수 없습니다.' });
            }
            res.json({ success: true, visitor: result[0] });
        });
    });

    return router;
};

