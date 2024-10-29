import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 가져옵니다.
import './HomePage.css'; // CSS 파일 임포트
import image from './assets/Smart Door Lock.png'; // 이미지 경로

const HomePage = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

    // 로그인 버튼 클릭 시 호출되는 함수
    const handleLogin = () => {
        navigate('/login'); // '/login' 경로로 이동
    };

    return (
        <div className="home-page">
            <img src={image} alt="Smart door lock device" className="main-image" /> {/* 이미지 추가 */}
            <h2>Security Door Lock</h2>
            <p>Polytech Chuncheon 2024 AI-software Hightech</p>
            <div className="button-container">
                <button onClick={handleLogin} className="button">login</button> {/* handleLogin 호출 */}
            </div>
        </div>
    );
};

export default HomePage;




