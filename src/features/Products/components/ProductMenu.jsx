import { Box, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
    listStyle: 'none',

    '& > li': {
      padding: theme.spacing(2, 4),
    },

    '& > li > a': {
      color: theme.palette.grey[700],
    },

    active: {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
}));

function ProductMenu(props) {
  const classes = useStyles();

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link
          component={NavLink}
          to=""
          style={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Description
        </Link>
      </li>

      <li>
        <Link
          component={NavLink}
          to="additional"
          style={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Additional Information
        </Link>
      </li>

      <li>
        <Link
          component={NavLink}
          to="reviews"
          style={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Reviews
        </Link>
      </li>
    </Box>
  );
}

ProductMenu.propTypes = {};

export default ProductMenu;
