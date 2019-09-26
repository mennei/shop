import React from 'react';
import Cart from '../../src/fe/containers/Cart/cart';

const CartView = ({query}) => {
  const {name, price, token, list} = query;
  return <Cart name={name} price={price} token={token} list={list} />;
};

CartView.getInitialProps = ({query}) => {
  return {query};
};

export default CartView;
