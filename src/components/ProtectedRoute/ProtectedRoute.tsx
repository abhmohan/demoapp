import { Navigate, Outlet } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

const ProtectedRoutes = () => {
    const [loggedIn] = useLocalStorage('loggedIn', false);
    return (
        loggedIn ? <Outlet/> : <Navigate to='/'/>
    )
}

export default ProtectedRoutes;
  