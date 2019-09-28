import fetch from 'isomorphic-unfetch';
import * as actionTypes from './actionTypes';

const conf = require ('../../../../server.config');

export const fetchProductsFail = error => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error: error,
  };
};

export const fetchProductsSuccess = (
  idToken,
  dbProducts,
  unsaveCart,
  totalCart
) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    token: idToken,
    list: dbProducts,
    myCart: unsaveCart,
    total: totalCart,
  };
};

export const cartStart = (idToken, products, unsaveCart, totalCart) => {
  return {
    type: actionTypes.CART_START,
    token: idToken,
    list: products,
    myCart: unsaveCart,
    total: totalCart,
  };
};

export const fetchProducts = (token, myCart, total) => {
  return dispatch => {
    if (!token) {
      return dispatch (
        fetchProductsFail ('Invalid token when fetching products')
      );
    }
    const url = `${conf.BASE_API_PATH}product/getProductsList?token=${token}`;
    fetch (url, {method: 'get'})
      .then (response => {
        let listPromise = response.json ();
        listPromise.then (
          data => {
            let dbList = data.productsList;
            dispatch (cartStart (token, dbList, myCart, total));
            dispatch (fetchProductsSuccess (token, dbList, myCart, total));
          },
          err => {
            console.log (err);
            dispatch (fetchProductsFail (err));
          }
        );
      })
      .catch (err => dispatch (fetchProductsFail (err)));
  };
};
