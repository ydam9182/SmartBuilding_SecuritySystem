// OpenDoorPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackHeader from './BackHeader';

const OpenDoorPage = () => {
    const navigate = useNavigate();
    const [setIsLocked] = useState(true);
    const [lockTimer, setLockTimer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [message, setMessage] = useState('');

    const handleBack = () => {
        navigate(-1);
    };


    // 문 열기 요청 핸들러
    const handleOpenDoor = async () => {
        try {
	    setTimeLeft(5);
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.0.15:3001/api/open-door', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ roomNumber: 'RoomNO_201' })
            });

            const data = await response.json();
            if (data.success) {
		const countdown = setInterval(() => {
                	setTimeLeft(prev => {
        	       	    if (prev > 1) return prev - 1;
  		            clearInterval(countdown);
                            navigate('/welcome');
        	        });
            	}, 1000);

            setLockTimer(countdown);
            } else {
                setMessage('문 열기 실패: ' + (data.message || '알 수 없는 오류'));
            }
        } catch (error) {
            console.error('문 열기 요청 중 오류 발생:', error);
            setMessage('서버와의 통신 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        return () => {
            if (lockTimer) {
                clearInterval(lockTimer);
            }
        };
    }, [lockTimer]);

    return (
        <div className="open-door-page">
            <BackHeader onBack={handleBack} />
            <h2 className="page-title">원격 문 제어</h2>
            <button onClick={handleOpenDoor}>OPEN</button>
            {timeLeft > 0 && (
                <p>문이 {timeLeft}초 후에 잠깁니다.</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default OpenDoorPage;

