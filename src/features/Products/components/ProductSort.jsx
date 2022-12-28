import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

function ProductSort({ currentSort, onChange }) {
  function handleSortChange(e, value) {
    if (onChange) onChange(value);
  }

  return (
    <Tabs
      value={currentSort}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleSortChange}
      aria-label="disabled tabs example"
    >
      <Tab label="Giá tăng dần" value="salePrice:ASC"></Tab>
      <Tab label="Giá giảm dần" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default ProductSort;
