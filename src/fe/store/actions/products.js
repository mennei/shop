import fetch from 'isomorphic-unfetch';
import * as actionTypes from './actionTypes';

const conf = require ('../../../../server.config');

export const fetchProductsFail = error => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error: error,
  };
};

export const fetchProductsSuccess = (idToken, products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    token: idToken,
    list: products,
  };
};

export const cartStart = (idToken, products) => {
  return {
    type: actionTypes.CART_START,
    token: idToken,
    list: products,
    name: '',
    price: 0,
    total: 0,
  };
};

export const fetchProducts = token => {
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
            let list = data.productsList;
            // dispatch (cartStart (token, list));
            dispatch (fetchProductsSuccess (token, list));
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
