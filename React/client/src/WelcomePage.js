import React, { useEffect, useState }  from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useLocation 및 useNavigate 훅 임포트

import './WelcomePage.css';
import lockIcon from './assets/1000957.png';
import doorOpenIcon from './assets/free-icon-door-9050998.png';
import visitorLogIcon from './assets/free-icon-returning-visitor-8053049.png';
import notificationIcon from './assets/free-icon-notifications-1436439.png';
import logoutIcon from './assets/free-icon-sign-out-5949713.png';

const WelcomePage = () => {
    //const location = useLocation(); // useLocation 훅을 사용하여 location 객체 가져오기
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 전환 기능 추가
    const [visitorLogs, setVisitorLogs] = useState([]); // 방문자 로그 상태
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username'); // 로그인 시 저장한 username 불러오기
        setUsername(storedUsername || 'Guest'); // 없을 경우 'Guest'로 설정
    }, []);

    // 비밀번호 변경 버튼 클릭 핸들러
    const handlePasswordChange = () => {
        navigate('/changepassword'); // 비밀번호 변경 페이지로 이동
    };

    const handleRemoteControl = () => {
        navigate('/OpenDoor'); // 원격 문 제어 페이지로 이동
    };

    const handleVisitorLog = () => {
        navigate('/visitorlog'); // 방문자 기록 페이지로 이동
    };

    // 알림 버튼 클릭 핸들러
    const handleNotification = () => {
        navigate('/notifications'); // 알림 페이지로 이동
    };
    
    // 로그아웃 버튼 클릭 핸들러
    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token'); // 로그아웃 시 토큰과 username 제거
	setVisitorLogs([]); // 방문자 로그 상태 초기화
        navigate('/login');
    };

    // 뒤로 가기 버튼 핸들러
    const handleBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className="welcome-page">
            {/* 좌측 상단에 Back 버튼 헤더 */}
            <div className="header">
                <button className="back-button" onClick={handleBack}>Back</button>
            </div>
            {/* 헤더 섹션 */}
            <header className="welcome-header">
                <button className="logout-button" onClick={handleLogout}>
                    <img src={logoutIcon} alt="Logout" className="icon" /> Logout
                </button> {/* 우측 상단 로그아웃 버튼 */}
            </header>
            <div className="welcome-content">
                <h2>안녕하세요!</h2> 
                <h2>{username}님</h2> 
                <h2>스마트 도어락에 오신걸 환영합니다.</h2>
                <div className="button-container">
                    <button className="action-button" onClick={handlePasswordChange}>
                        <img src={lockIcon} alt="Change Password" className="icon" /> 패스워드 변경
                    </button>
                    <button className="action-button" onClick={handleRemoteControl}>
                        <img src={doorOpenIcon} alt="Remote Control" className="icon" /> 원격 문 제어
                    </button> 
                    <button className="action-button" onClick={handleVisitorLog}>
                        <img src={visitorLogIcon} alt="Visitor Log" className="icon" /> 방문자 기록
                    </button> 
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;





