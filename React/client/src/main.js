import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // App 컴포넌트를 임포트

const Main = () => (
    <Router>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Router>
);

export default Main;

