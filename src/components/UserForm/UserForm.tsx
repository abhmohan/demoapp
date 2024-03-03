import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useSearchParams  } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import { type ChangeEvent, useState } from 'react';
import type { UserType, UsersType } from '../../reducers/Users';
import styles from './UserForm.module.css';

const REQUIRED_TEXT_ERROR_MESSAGE = 'This field is required';
const AGE_ERROR_MESSAGE = 'This field is required';

type UserFormType = {
    onClose: () => void,
    onSave: (value: UserType) => void
};

type ErrorsType = {
    name?: string,
    age?: string,
    profession?: string
}

const validate = (value: UserType) => {
    const errors: Record<string, string> = {};

    if (value['name'] === '') {
        errors['name'] = REQUIRED_TEXT_ERROR_MESSAGE;
    }

    if (value['profession'] === '') {
        errors['profession'] = REQUIRED_TEXT_ERROR_MESSAGE;
    }

    if (value['age'] < 0) {
        errors['age'] = AGE_ERROR_MESSAGE;
    }

    return errors;
}

const UserForm = ({ onClose, onSave }: UserFormType) => {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState({
        name: '',
        age: 0,
        profession: ''
    });
    const { users } = useSelector((state: { users: UsersType }) => state);
    const [errors, setErrors] = useState<ErrorsType>({});
    const [isShowError, setIsShowError] = useState(false);

    useEffect(() => {
        if (searchParams.get('user')) {
            const currentUser: UserType | undefined = users[Number(searchParams.get('user'))];
            if (currentUser != null) {
                setValue(currentUser);
            }
        }
    }, [users, searchParams]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value: fieldValue } = e.target;
        const newValue = { ...value, [name]: fieldValue };
        const errors = validate(newValue);

        setValue(newValue);
        setErrors(errors);
    };

    const handleSave = () => {
        const errors = validate(value);

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setIsShowError(true);
            return;
        }
        onSave(value);
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>
                Edit user
            </DialogTitle>
            <DialogContent>
                <form autoComplete='off' noValidate>
                    <TextField
                        helperText={isShowError && errors['name']}
                        error={isShowError && Boolean(errors['name'])}
                        required
                        classes={{ root: styles.textfield }}
                        value={value['name']}
                        fullWidth
                        label='Name'
                        name='name'
                        onChange={handleChange} />

                    <TextField
                        helperText={isShowError && errors['age']}
                        error={isShowError && Boolean(errors['age'])}
                        required
                        classes={{ root: styles.textfield }}
                        type='number'
                        value={value['age']}
                        fullWidth
                        label='Age'
                        name='age'
                        onChange={handleChange} />
                    <TextField
                        helperText={isShowError && errors['profession']}
                        error={isShowError && Boolean(errors['profession'])}
                        required
                        classes={{ root: styles.textfield }}
                        value={value['profession']}
                        fullWidth
                        label='Profession'
                        name='profession'
                        onChange={handleChange} />
                </form>
            </DialogContent>
            <DialogActions>
                <Button color='inherit' onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
};

export default UserForm;
