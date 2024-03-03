import { createSlice } from '@reduxjs/toolkit';

export type UserType = {
    name: string,
    age: number,
    profession: string
};

export type UsersType = UserType[];

const Users = [
    { name: 'John', age: 30, profession: 'Engineer'},
    { name: 'Emily', age: 25, profession: 'Teacher'},
    { name: 'Michael', age: 35, profession: 'Doctor'},
    { name: 'Sophia', age: 28, profession: 'Software Developer'},
    { name: 'Daniel', age: 33, profession: 'Lawyer'},
    { name: 'Emma', age: 29, profession: 'Graphic Designer'},
    { name: 'Christopher', age: 40, profession: 'Architect'},
    { name: 'Olivia', age: 27, profession: 'Marketing Manager'},
    { name: 'Alexander', age: 32, profession: 'Accountant'},
    { name: 'Ava', age: 31, profession: 'Writer'}
];

const initialState = Users satisfies UsersType as UsersType

const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.push(payload);
    },
    updateUser: (state, { payload }) => {
      const { index, data } = payload;
      state[index] = data;
    }
  },
});

const { actions, reducer } = UsersSlice;
export const { addUser, updateUser } = actions;
export default reducer;
