import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Button,
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
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

function LoginForm(props) {
  const { onSubmit } = props;
  const classes = useStyles();

  const schema = yup
    .object({
      identifier: yup
        .string()
        .required('Please enter your email')
        .email('Please enter a valid email address'),
      password: yup.string().required('Please enter your password'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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
          <LockOpenOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <form className={classes.form} onSubmit={form.handleSubmit(handleOnSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField name="identifier" label="Email" form={form} />
            </Grid>
            <Grid item xs={12}>
              <PasswordField name="password" label="Password" form={form} />
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
            Sign in
          </Button>
        </form>
      </div>
    </Container>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;
