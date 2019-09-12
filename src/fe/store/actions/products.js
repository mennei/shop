import fetch from 'isomorphic-unfetch';

import * as actionTypes from './actionTypes';

const conf = require ('../../../../server.config');

export const fetchProductsFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const fetchProductsSuccess = (token, productsList) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    idToken: token,
    products: productsList,
  };
};

export const fetchProducts = token => {
  return dispatch => {
    if (!token) {
      dispatch (fetchProductsFail ('Invalid token'));
    }
    const url = `${conf.BASE_API_PATH}products/getProductsList?token=${token}`;
    fetch (url, {method: 'get'})
      .then (dispatch (fetchProductsSuccess (token, data.productsList)))
      .catch (err => dispatch (fetchProductsFail (err)));
  };
};
