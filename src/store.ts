import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './reducers/Users';

const store = configureStore({
    reducer: {
        users: UserReducer
    },
});

export default store;