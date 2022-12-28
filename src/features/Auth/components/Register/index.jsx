import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
// import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';

function Register(props) {
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();

  const { closeDialog } = props;

  async function handleOnSubmit(values) {
    try {
      values.username = values.email;
      values.fullName = `${values.firstName} ${values.lastName}`;

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      console.log('new user', user);

      // closeDialog
      if (closeDialog) {
        closeDialog();
      }

      // enqueueSnackbar('Register Successfully🎈🧨', { variant: 'success' });
    } catch (error) {
      console.log('Failed to register', error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  return (
    <div>
      <RegisterForm onSubmit={handleOnSubmit} />
    </div>
  );
}

Register.propTypes = {};

export default Register;
