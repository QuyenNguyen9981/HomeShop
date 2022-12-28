import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

function ProductFilter({ filters, onChange, loading }) {
  function handleCategoryChange(newCategoryId) {
    if (!onChange) return;

    const newFilters = {
      'category.id': newCategoryId,
    };

    onChange(newFilters);
  }

  function handleChange(values) {
    if (!onChange) return;

    onChange(values);
  }

  return (
    <Box>
      <FilterByCategory loading={loading} onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleChange} />
      <FilterByService filters={filters} onChange={handleChange} />
    </Box>
  );
}

ProductFilter.propTypes = {
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

export default ProductFilter;
