import fetch from 'isomorphic-unfetch';

import * as actionTypes from './actionTypes';

const conf = require ('../../../../server.config');

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout (() => {
      dispatch (logout ());
    }, expirationTime * 1000);
  };
};

export const fetchProductsStart = idToken => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
    token: idToken,
  };
};

export const auth = (username, password, isSignup) => {
  return dispatch => {
    dispatch (authStart ());
    const authData = {username: username, password: password};
    let url;
    if (isSignup) {
      url = `${conf.BASE_API_PATH}authoristion/doSignup`;
    } else {
      url = `${conf.BASE_API_PATH}authoristion/getToken`;
    }
    fetch (url, {
      method: 'post',
      body: JSON.stringify (authData),
      headers: new Headers ({
        'content-type': 'application/json',
      }),
    })
      .then (response => {
        let tokenPromise = response.json ();
        tokenPromise.then (
          data => {
            if (data.token || data.userId) {
              dispatch (authSuccess (data.token, data.userId));
              dispatch (fetchProductsStart (data.token));
              // dispatch (checkAuthTimeout (5));
            } else {
              dispatch (authFail ('Invalid username'));
            }
          },
          err => {
            console.log (err);
            dispatch (authFail (err));
          }
        );
      })
      .catch (err => {
        console.log (err);
        dispatch (authFail (err));
      });
  };
};