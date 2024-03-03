import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [_, setLoggedIn, removeLoggedIn] = useLocalStorage('loggedIn', true);
    const navigate = useNavigate();
    const handleLogout = () => {
        removeLoggedIn('loggedIn');
        navigate('/');
    };

    return (
        <IconButton title='Edit' onClick={handleLogout}>
            <LogoutIcon />
        </IconButton>
    )
};

export default Logout;
