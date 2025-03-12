import React from 'react';
import { WalletKitProvider } from '@mysten/wallet-kit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import StudentDashboard from './Components/StudentDashboard';
import AdminDashboard from './Components/AdminDashboard';

function App() {
    return (
        <WalletKitProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/student" element={<StudentDashboard />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </div>
            </Router>
        </WalletKitProvider>
    );
}

export default App;