import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackHeader from './BackHeader';
import './VisitorDetailPage.css';

const VisitorDetailPage = () => {
    const { id } = useParams();
    const [visitor, setVisitor] = useState(null);

    useEffect(() => {
        const fetchVisitorDetail = async () => {
            try {
                const response = await fetch(`http://192.168.0.15:3001/api/visitor-details/${id}`);
                const data = await response.json();
                if (data.success) {
                    setVisitor(data.visitor);
                }
            } catch (error) {
                console.error('방문자 세부 정보를 가져오는 중 오류 발생:', error);
            }
        };
        fetchVisitorDetail();
    }, [id]);

    if (!visitor) return <p>Loading...</p>;

    return (
        <div>
            <h2>방문자 세부 정보</h2>    
	    <BackHeader />        
	    <ul className="visitor-log-list">
                <li >
                    <img src={`http://192.168.0.15:3001/images/${visitor.Img_Path}`} alt="visitor"  width="570" classname="deimg" />
                    
                </li>
		<div>방문 시간: {visitor.time}</div>
            </ul>
        </div>
    );
};

export default VisitorDetailPage;

