import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import productApi from 'api/productApi';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import FilterViewer from '../components/FilterViewer';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '252px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '30px',
    paddingBottom: '20px',
  },
}));

function ListProductPage(props) {
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 20,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
        console.log({ data, pagination });

        setLoading(false);
      } catch (error) {
        console.log('Failed to fecth product list', error);
      }
    })();
  }, [queryParams]);

  function handleOnChange(e, page) {
    const filters = {
      ...queryParams,
      _page: page,
    };

    setSearchParams(filters);
  }

  function handleSortChange(newSortValue) {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    setSearchParams(filters);
  }

  function handleFilterChange(newFilters) {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    setSearchParams(filters);
  }

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilter
                filters={queryParams}
                onChange={handleFilterChange}
                loading={loading}
              />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={handleFilterChange} />

              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  count={totalPages}
                  page={pagination.page}
                  color="primary"
                  onChange={handleOnChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ListProductPage.propTypes = {};

export default ListProductPage;
