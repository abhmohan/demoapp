import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useSearchParams, useNavigate  } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import styles from './Login.module.css';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [initialUsername, setInitialUsername] = useLocalStorage('initialUsername');
    const [initialPassword, setInitialPassword] = useLocalStorage('initialPassword');
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);
    const navigate = useNavigate();

    useEffect(() => {
        const username = searchParams.get('initialUsername');
        const password = searchParams.get('initialPassword');

        if (username && password && (initialUsername == null || initialPassword == null)) {
            setSearchParams((params) => {
                params.delete('initialUsername');
                params.delete('initialPassword');
                return params;
            });
            setInitialUsername(username);
            setInitialPassword(password);
        }

        if (initialUsername && initialPassword && loggedIn) {
            navigate('/home');
        }
    }, [setInitialUsername, setInitialPassword, loggedIn, setSearchParams, searchParams, setLoggedIn, navigate, initialUsername, initialPassword]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (userName !== initialUsername || password !== initialPassword) {
            setIsValid(false);
            return;
        }

        setLoggedIn(true);
        navigate('/home');
    };

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <Paper elevation={3}>
            <form className={styles.form} autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        onChange={handleUserNameChange}
                        placeholder='Username'
                    />
                    <TextField
                        fullWidth
                        onChange={handlePasswordChange}
                        placeholder='Password'
                        type='password'
                    />
                    {!isValid && <Typography color='error'>Please enter valid Login details</Typography>}
                    <Button type='submit'>Login</Button>
                </Stack>
            </form>
        </Paper>
    )
};

export default Login;