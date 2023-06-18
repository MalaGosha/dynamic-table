import React from 'react';
import './App.css';
import Home from 'pages/Home';
import BreadcrumbProvider from 'context/BreadcrumbProvider';

const App: React.FC = () => {
    return (
        <>
            <BreadcrumbProvider>
                <Home />
            </BreadcrumbProvider>
        </>
    );
};

export default App;

