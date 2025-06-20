import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { useEffect } from 'react';
import GamesList from '@pages/gamesList/GamesList';
import LoginPage from '@pages/auth/login/LoginPage';
import RegisterPage from '@pages/auth/register/RegisterPage';
import NavigationService from '@services/navigationService';

function AppRoutes() {
    const navigate = useNavigate();
    useEffect(() => {
        NavigationService.setNavigate(navigate);
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/games" element={<GamesList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
};

export default AppRoutes;
