import fetch from 'isomorphic-unfetch';

import * as actionTypes from './actionTypes';

const conf = require ('../../../../server.config');

export const fetchCartFail = error => {
  return {
    type: actionTypes.FETCH_CART_FAIL,
    error: error,
  };
};

export const fetchCartSuccess = (idToken, products) => {
  return {
    type: actionTypes.FETCH_CART_SUCCESS,
    token: idToken,
    list: products,
  };
};

export const addToCartFail = error => {
  return {
    type: actionTypes.ADD_TO_CART_FAIL,
    error: error,
  };
};

export const addToCartSuccess = (idToken, products) => {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    token: idToken,
    list: products,
  };
};

export const fetchCart = token => {
  return dispatch => {
    if (!token) {
      return dispatch (fetchCartFail ('Invalid token when fetching cart'));
    }
    const url = `${conf.BASE_API_PATH}cart/getCart?token=${token}`;
    fetch (url, {method: 'get'})
      .then (response => {
        let listPromise = response.json ();
        listPromise.then (
          data => {
            let list = data.productsList;
            dispatch (fetchCartSuccess (token, list));
          },
          err => {
            console.log (err);
            dispatch (fetchCartFail (err));
          }
        );
      })
      .catch (err => dispatch (fetchCartFail (err)));
  };
};

export const addItemToCart = (token, list) => {
  return dispatch => {
    if (!token) {
      return dispatch (addToCartFail ('Invalid token when add item to cart'));
    }
    const url = `${conf.BASE_API_PATH}cart/addToCart?token=${token}`;
    fetch (url, {method: 'get'})
      .then (response => {
        let listPromise = response.json ();
        listPromise.then (
          data => {
            let list = data.productsList;
            dispatch (addToCartSuccess (token, list));
          },
          err => {
            console.log (err);
            dispatch (addToCartFail (err));
          }
        );
      })
      .catch (err => dispatch (addToCartFail (err)));
  };
};
