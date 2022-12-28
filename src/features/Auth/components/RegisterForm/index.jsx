import { yupResolver } from '@hookform/resolvers/yup';
import { LinearProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
}));

function RegisterForm(props) {
  const { onSubmit } = props;
  const classes = useStyles();

  const schema = yup
    .object({
      firstName: yup.string().required('Please enter your first name'),
      lastName: yup.string().required('Please enter your last name'),
      email: yup
        .string()
        .required('Please enter your email')
        .email('Please enter a valid email address'),
      password: yup
        .string()
        .required('Please enter your password')
        .min(6, 'Please enter at least 6 characters.'),
      // .matches('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$', 'plea),
      retypePassword: yup
        .string()
        .required('Please retype your password.')
        .oneOf([yup.ref('password')], 'Your passwords do not match.'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      retypePassword: '',
    },

    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  async function handleOnSubmit(values) {
    if (!onSubmit) return;

    await onSubmit(values);
    // form.reset();
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {isSubmitting && <LinearProgress className={classes.progress} />}

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Create An Acount
        </Typography>

        <form className={classes.form} onSubmit={form.handleSubmit(handleOnSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField name="firstName" label="First Name" form={form} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField name="lastName" label="Last Name" form={form} />
            </Grid>
            <Grid item xs={12}>
              <InputField name="email" label="Email" form={form} />
            </Grid>
            <Grid item xs={12}>
              <PasswordField name="password" label="Password" form={form} />
            </Grid>
            <Grid item xs={12}>
              <PasswordField name="retypePassword" label="Retype Password" form={form} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            className={classes.submit}
          >
            Create an acount
          </Button>
        </form>
      </div>
    </Container>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RegisterForm;
