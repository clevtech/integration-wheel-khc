import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../context/authContext';

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    const location = useLocation();

    const managerPathnames = ['/history', '/services'];

    if (!user) {
        return <Navigate to='/' state={{ from: location }} />;
    } else {
        if (user.role === 'MANAGER') {
            if (managerPathnames.includes(location.pathname)) {
                return children;
            } else {
                // Navigate back
                return <Navigate to='/services' state={{ from: location }} />;
            }
        } else {
            return children;
        }
    }
}
