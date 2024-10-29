import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackHeader from './BackHeader'; // BackHeader 임포트
import axios from 'axios';
import './ChangePasswordPage.css';

// 아이콘 이미지 가져오기
import currentPasswordIcon from './assets/free-icon-change-password-11435072.png';
import newPasswordIcon from './assets/free-icon-user-12048663.png';
import confirmPasswordIcon from './assets/free-icon-password-15499850.png';
import backIcon from './assets/free-icon-left-5108101.png';

const ChangePasswordPage = ({ confirmationMessage, onBack }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

	if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage('모든 필드를 채워주세요.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://192.168.0.15:3001/api/change-password', {
                currentPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setMessage('비밀번호가 성공적으로 변경되었습니다.');
                navigate('/'); // 비밀번호 변경 후 로그인 페이지로 이동
            } else {
                setMessage(response.data.message || '비밀번호 변경 중 오류가 발생했습니다.');
            }
        } catch (error) {
            setMessage('서버 오류 발생');
        }
    };

    return (
        <div className="change-password-page">
            <BackHeader onBack={onBack} />
            <h2>로그인 패스워드 변경</h2>
            {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
            {message && <p className="message">{message}</p>}
            <div className="input-container">
                <label htmlFor="currentPassword">
                    <img src={currentPasswordIcon} alt="Current Password" className="icon" /> 현재 비밀번호:
                </label>
                <input
                    type="password"
                    id="currentPassword"
                    placeholder="현재 비밀번호"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <label htmlFor="newPassword">
                    <img src={newPasswordIcon} alt="New Password" className="icon" /> 새로운 비밀번호:
                </label>
                <input
                    type="password"
                    id="newPassword"
                    placeholder="새로운 비밀번호"
                    value={newPassword}
                    onChange={handleSubmit}
		    onChange={(e) => setNewPassword(e.target.value)}
                />

                <label htmlFor="confirmPassword">
                    <img src={confirmPasswordIcon} alt="Confirm Password" className="icon" /> 비밀번호 확인:
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                <button onClick={handleSubmit} className="button">변경하기</button>
            </div>
            <button onClick={onBack} className="back-button">
                <img src={backIcon} alt="Back" className="icon" /> back
            </button>
        </div>
    );
};

export default ChangePasswordPage;

