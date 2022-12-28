import { Box, Typography } from '@material-ui/core';
import { IMAGE_PLACEHOLDER, STATIC_HOST } from 'constants/index.js';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router';
import { formatPrice } from 'utils';

function Product({ product }) {
  const navigate = useNavigate();

  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : `${IMAGE_PLACEHOLDER}`;

  const handleOnClick = () => {
    navigate(`${product.id}`);
  };

  return (
    <Box padding={1} onClick={handleOnClick} style={{ cursor: 'pointer' }}>
      <Box minHeight="216">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>

      <Typography variant="body2">{product.name}</Typography>

      <Typography variant="body2">
        <Box component="span" fontSize="14px" fontWeight="bold" mr={1}>
          {formatPrice(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

Product.propTypes = {
  product: PropTypes.object,
};

Product.defaultProps = {
  product: {},
};

export default Product;
