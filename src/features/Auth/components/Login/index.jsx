import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
// import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginFom';

function Login(props) {
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();

  const { closeDialog } = props;

  async function handleOnSubmit(values) {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      console.log('Current user: ', user);

      // closeDialog
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      console.log('Failed to register', error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  return (
    <>
      <LoginForm onSubmit={handleOnSubmit} />
    </>
  );
}

Login.propTypes = {};

export default Login;
