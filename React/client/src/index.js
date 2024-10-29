import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import Main from './main'; // main 컴포넌트를 임포트
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Use the updated service worker
import './index.css'; // Import your CSS file

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the Main component
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);

// 서비스 워커 등록
serviceWorkerRegistration.register(); // Register the updated service worker




