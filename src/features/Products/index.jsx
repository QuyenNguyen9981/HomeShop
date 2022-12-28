import React from 'react';
import { Box } from '@material-ui/core';
import { Route, Routes } from 'react-router';
import ListProductPage from './page/ListProductPage';
import ProductsDetailPage from './page/ProductsDetailPage';

function ProductFeature(props) {
  return (
    <Box pt={2}>
      <Routes>
        <Route index element={<ListProductPage />} />
        <Route path=":productId/*" element={<ProductsDetailPage />} />
      </Routes>
    </Box>
  );
}

ProductFeature.propTypes = {};

export default ProductFeature;
