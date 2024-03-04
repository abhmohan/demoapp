import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    // eslint-disable-next-line
    const [_, setLoggedIn, removeLoggedIn] = useLocalStorage('loggedIn');
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
