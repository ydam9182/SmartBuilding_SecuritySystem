// openDoorRoutes.js
const express = require('express');
const router = express.Router();

const openDoorRoutes = (sendToCServer) => {
    router.post('/', (req, res) => {
        const roomNo = req.user.RoomNO; // JWT에서 RoomNo 추출
        const message = `WEB:room_${roomNo}:open:`;

        // C 서버에 메시지 전송
        sendToCServer(message);
        res.json({ success: true, message: '문 열기 요청이 전송되었습니다.' });
    });

    return router;
};

module.exports = openDoorRoutes;

