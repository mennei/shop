import fetch from 'isomorphic-unfetch';
import * as actionTypes from './actionTypes';
import Router from 'next/router';

const conf = require ('../../../../server.config');

export const authStartServer = () => {
  return {
    type: actionTypes.AUTH_STRAT_SERVER,
    idToken: null,
    userId: null,
  };
};

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
  localStorage.removeItem ('token');
  localStorage.removeItem ('expirationDate');
  localStorage.removeItem ('userId');
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
              const expirationDate = new Date (
                new Date ().getTime () + 5 * 1000
              );
              localStorage.setItem ('token', data.token);
              localStorage.setItem ('expirationDate', expirationDate);
              localStorage.setItem ('userId', data.userId);
              dispatch (authSuccess (data.token, data.userId));
              dispatch (fetchProductsStart (data.token));
              Router.push ({
                pathname: '/products',
                query: {token: data.token, list: []},
              });
            } else {
              dispatch (authFail (data.err));
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

export const authCheckState = localStorage => {
  return dispatch => {
    if (localStorage.length === 0) {
      dispatch (authStartServer ());
    }
    const token = localStorage.getItem ('token');
    if (!token) {
      // dispatch (logout ());
    } else {
      const expirationDate = new Date (localStorage.getItem ('expirationDate'));
      if (expirationDate <= new Date ()) {
        dispatch (logout ());
      } else {
        const userId = localStorage.getItem ('userId');
        dispatch (authSuccess (token, userId));
        // dispatch (
        //   checkAuthTimeout (
        //     (expirationDate.getTime () - new Date ().getTime ()) / 1000
        //   )
        // );
      }
    }
  };
};

export const authCheckStateServer = isServer => {
  return dispatch => {
    // if (isServer) {
    dispatch (authStartServer ());
    // } else {
    // dispatch (authFail ('isServer in not valid'));
    // }
  };
};
