import {
  AppBar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { cartItemsCountSelector } from 'features/Cart/selectors';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  link: {
    color: '#fff',
    textDecoration: 'none',
    '& span:hover': {
      color: 'red'
    },
  },
  btnMenu: {
    '& span:hover': {
      color: 'red'
    }
  },

  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.secondary[500],
    zIndex: 1,
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const cartItemsCount = useSelector(cartItemsCountSelector)
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClickLogout = () => {
    setAnchorEl(null);
    const action = logout();
    dispatch(action);
  };
  const handleCartList = () => {
    navigate('/cart');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <StorefrontRoundedIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/products">
              HomeShop
            </Link>
          </Typography>
          {/* <NavLink className={classes.link} to="todos">
            <Button color="inherit">TODOS</Button>
          </NavLink> */}
          <NavLink className={classes.link} to="products">
            <Button color="inherit">PRODUCTS</Button>
          </NavLink>
          {/* <NavLink className={classes.link} to="albums">
            <Button color="inherit">ALBUMS</Button>
          </NavLink> */}
          {!isLoggedIn ? (
            <Button color="inherit" onClick={handleClickOpen} className={classes.btnMenu}>
              LOGin
            </Button>
          ) : (
            <IconButton color="inherit" onClick={handleClickMenu}>
              <AccountCircle />
            </IconButton>
          )}
          <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleCartList}>
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            onclose(event, reason);
          }
        }}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeBtn} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account? Sign in
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account? Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      </Menu>

    </div>
  );
}
