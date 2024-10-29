import React from 'react';
import BackHeader from './BackHeader';
import './VisitorLogPage.css';

const VisitorLogPage = ({ visitorLogs, onVisitorClick }) => {
    return (
        <div className="visitor-records">
            <BackHeader />
            <h2>방문자 기록 확인</h2>
	    <header> <div>No.</div> <div>Capture Image</div> <div>Time</div></header>

            <ul className="visitor-log-list">
                {visitorLogs.map((log, index) => (
                    <li key={log.eventID} onClick={() => onVisitorClick(log.eventID)}>
                        <strong>{index+1}</strong>
                        <img src = {`http://192.168.0.15:3001/images/${log.Img_Path}`} alt={`${log.RoomNo} 방문자`} width="100" classname="logimg" />
                        <p>{log.time}</p>
                   </li>
                ))}
            </ul>
        </div>
    );
};

export default VisitorLogPage;

