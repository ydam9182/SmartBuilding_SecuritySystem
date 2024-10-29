import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.0.15:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('username', data.user.RoomNO); 
		// 로그인 성공 시 username 저장
                localStorage.setItem('token', data.token); // JWT 토큰 저장

                navigate('/welcome'); // Welcome 페이지로 이동
            }  else {
                setErrorMessage(data.message || '로그인 실패');
            }
        } catch (error) {
            setErrorMessage('서버 오류 발생');
        }
    };

    return (
        <div className="LoginPage">
	<h2 className="loginTitle">Log In</h2>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit} className="loginForm">
		<div>
		    <label className="inputLabel" htmlFor="username">Room No:</label>
		        <input
		                type="text"
		                className="inputField"
		                id="username"
		                name="username"
		                value={username}
		                onChange={(e) => setUsername(e.target.value)} // 상태 업데이트
		                required
                    />
		</div>
                <div>
		    <label className="inputLabel" htmlFor="password">Password:</label>
		        <input
		                type="password"
		                className="inputField"
		                id="password"
		                name="password"
		                value={password}
		                onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
		                required
                    />
		</div>
                <button type="submit" className="submitButton">login</button>
                {errorMessage && <p className="errorMessage">{errorMessage}</p>} {/* 오류 메시지 표시 */}
            </form>
        </div>
    );
};

export default LoginPage;

