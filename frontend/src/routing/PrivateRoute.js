import React, { useEffect } from 'react'
import AuthService from '../services/auth-service'
import { Navigate, useNavigate, Route } from 'react-router-dom'

const ProtectedRoute = ({
    user,
    redirectPath = '/login',
    children,
}) => {
    if (!user) {
        console.log("user in private route: ", user)
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default ProtectedRoute