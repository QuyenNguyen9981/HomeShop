import { Box } from '@material-ui/core';
import { IMAGE_PLACEHOLDER, STATIC_HOST } from 'constants';
import PropTypes from 'prop-types';
import React from 'react';

function ProductThumbnail({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : `${IMAGE_PLACEHOLDER}`;

  return (
    <Box>
      <img src={thumbnailUrl} alt={product.name} width="100%" />
    </Box>
  );
}

ProductThumbnail.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductThumbnail;
