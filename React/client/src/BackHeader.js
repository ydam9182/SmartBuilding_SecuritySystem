// BackHeader.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackHeader.css'; // 스타일을 위한 CSS 파일

const BackHeader = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 전환 기능 추가

    // 뒤로 가기 버튼 핸들러
    const handleBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className="back-header">
            <button className="back-button" onClick={handleBack}>Back</button>
        </div>
    );
};

export default BackHeader;
