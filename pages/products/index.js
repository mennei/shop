import React from 'react';
import Products from '../../src/fe/containers/Products/Products';
import {withRouter} from 'next/router';

const ProductsList = () => {
  return <Products />;
};

export default withRouter (ProductsList);
