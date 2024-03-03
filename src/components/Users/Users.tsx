import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { nanoid } from 'nanoid';

import type { UserType, UsersType } from '../../reducers/Users';
import UserForm from '../UserForm';
import { addUser } from '../../reducers/Users';
import Layout from '../Layout';
import styles from './Users.module.css';

const Users = () => {
    const { users } = useSelector((state: { users: UsersType }) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate ();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleClick = (index: number) => () => {
        navigate(`/profile?user=${index}`);
    };

    const handleAddNew = () => {
        navigate('/home?mode=new');
    };

    const isOpen = searchParams.get('mode') === 'new';

    const handleClose = () => {
        setSearchParams((params) => {
            params.delete('mode');
            return params;
        });
    };

    const handleSave = (value: UserType) => {
        dispatch(addUser(value));
        handleClose();
    };

    return (
        <Layout>
            <Button onClick={handleAddNew}>Add new</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Profession</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map(({ name, age, profession }, index) => (
                        <TableRow className={styles.row} hover onClick={handleClick(index)} key={nanoid()}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{age}</TableCell>
                            <TableCell  >{profession}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isOpen && <UserForm onClose={handleClose} onSave={handleSave} />}
        </Layout>
    )
};

export default Users;
