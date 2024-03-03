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
    const [initialUsername] = useLocalStorage('initialUsername', searchParams.get('initialUsername'));
    const [initialPassword] = useLocalStorage('initialPassword', searchParams.get('initialPassword'));
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);
    const navigate = useNavigate();

    useEffect(() => {
        const initialUsername = searchParams.get('initialUsername');
        const initialPassword = searchParams.get('initialPassword');


        if (initialUsername && initialPassword) {
            setSearchParams((params) => {
                params.delete('initialUsername');
                params.delete('initialPassword');
                return params;
            });
            setLoggedIn(true);
        }

        console.log(loggedIn);
        if (loggedIn) {
            navigate('/home');
        }
    }, [loggedIn]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(initialUsername, initialPassword);
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