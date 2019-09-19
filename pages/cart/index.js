import React from 'react';
import Cart from '../../src/fe/containers/Cart/cart';

const CartView = ({query}) => {
  const {name, price} = query;
  return <Cart name={name} price={price} />;
};

CartView.getInitialProps = ({query}) => {
  return {query};
};

export default CartView;
