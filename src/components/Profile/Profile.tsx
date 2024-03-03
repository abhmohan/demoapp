import { useSelector, useDispatch } from 'react-redux';

import Edit from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { nanoid } from 'nanoid';

import { Link, useSearchParams  } from 'react-router-dom';

import type { UserType, UsersType } from '../../reducers/Users';
import Detail from './Detail';
import UserForm from '../UserForm';
import { updateUser } from "../../reducers/Users";
import Layout from '../Layout';
import styles from './Profile.module.css';

const Profile = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state: { users: UsersType }) => state);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentUser: UserType = users[Number(searchParams.get('user'))];

    const handleClose = () => {
        setSearchParams((params) => {
            params.delete('mode');
            return params;
        });
    };

    const handleSave = (value: UserType) => {
        dispatch(updateUser({ data: value, index: Number(searchParams.get('user')) }));
        handleClose();
    };

    const isOpen = searchParams.get('mode') === 'edit';
    if (currentUser == null) {
        return (
            <Layout>
                <Typography>User doesn't exist.</Typography>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className={styles.detailContainer}>
                {Object.keys(currentUser).map((key, index) => <Detail key={nanoid()} index={index} label={key} value={currentUser[key as keyof UserType]} />)}
                <Link
                    to={{
                        search: `?user=${searchParams.get('user')}&mode=edit`,
                    }}
                >
                    <IconButton title='Edit'>
                        <Edit />
                    </IconButton>
                </Link>
            </div>
            {isOpen && <UserForm onClose={handleClose} onSave={handleSave} />}
        </Layout>
    )

};

export default Profile;