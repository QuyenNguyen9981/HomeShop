import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import CategorySkeletonList from '../CategorySkeletonList';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};

FilterByCategory.defaultProps = {
  loading: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyle: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: `all .25s`,

      '&:hover': {
        color: theme.palette.primary.dark,
        cursor: 'pointer',
      },
    },
  },
}));

function FilterByCategory({ onChange, loading }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fecth category list ' + error);
      }
    })();
  }, []);

  function handleCategoryClick(category) {
    if (onChange) {
      onChange(category.id);
    }
  }

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>

      {loading ? (
        <CategorySkeletonList />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <Typography variant="body2">{category.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default FilterByCategory;
