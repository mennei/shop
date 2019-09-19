import React from 'react';
import ProductDetails from '../../../src/fe/components/Product/productDetails';

const ProductView = ({query}) => {
  console.log (query);
  const {name, price, token, list} = query;
  return <ProductDetails name={name} price={price} token={token} list={list} />;
};

ProductView.getInitialProps = ({query}) => {
  return {query};
};

export default ProductView;
