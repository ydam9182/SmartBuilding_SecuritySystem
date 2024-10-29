import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage';
import ChangePassword from './ChangePasswordPage';
import OpenDoorPage from './OpenDoorPage';
import VisitorLogPage from './VisitorLogPage';
import VisitorDetailPage from './VisitorDetailPage';

const App = () => {
    const [visitorLogs, setVisitorLogs] = useState([]);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const navigate = useNavigate();

    // 방문자 로그 데이터를 가져오는 함수
   const fetchVisitorLogs = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://192.168.0.15:3001/api/visitors', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
            setVisitorLogs(data.visitors);
        } else {
            console.error('방문자 로그 가져오기 실패:', data.message);
        }
    } catch (error) {
        console.error('방문자 로그 데이터를 가져오는 중 오류 발생:', error);
    }
};


    useEffect(() => {
        fetchVisitorLogs(); // 방문자 로그 데이터 로드
    }, []);

    // 로그인 성공 시 웰컴 페이지로 이동
    const handleLogin = async () => {
        navigate('/Welcome');
    };

    // 비밀번호 변경 성공 시 메시지 설정
    const handleChangePassword = () => {
        setConfirmationMessage('비밀번호가 변경되었습니다.');
    };

    // 방문자 클릭 시 상세 페이지로 이동
    const handleVisitorClick = (id) => {
        navigate(`/visitor-details/${id}`);
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/Login" element={<LoginPage onStart={handleLogin} />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/Welcome" element={<WelcomePage />} />
                <Route 
                    path="/ChangePassword" 
                    element={<ChangePassword onChangePassword={handleChangePassword} confirmationMessage={confirmationMessage} onBack={() => navigate('/')} />} 
                />
                <Route path="/visitorlog" element={<VisitorLogPage visitorLogs={visitorLogs} onVisitorClick={handleVisitorClick} />} />
                <Route path="/visitor-details/:id" element={<VisitorDetailPage />} />
                <Route path="/OpenDoor" element={<OpenDoorPage onBack={() => navigate('/')} />} />
            </Routes>
        </div>
    );
};


export default App;

