import fetch from 'isomorphic-unfetch';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = token => {
  console.log (token);
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
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

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch (authStart ());
    const authData = {email: email, password: password};
    const url = 'http://localhost:3000/api/v1/authoristion/getToken';
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
            console.log (data);
            if (data.token) {
              dispatch (authSuccess (data.token));
            }
          },
          err => {
            console.log (err);
            dispatch (authFail (err));
          }
        );
        dispatch (checkAuthTimeout (response.data.expiresIn));
      })
      .catch (err => {
        console.log (err);
        dispatch (authFail (err));
      });
  };
};
