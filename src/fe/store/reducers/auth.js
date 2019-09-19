import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStartServer = (state, action) => {
  return updateObject (state, {error: null, loading: false});
};

const authStart = (state, action) => {
  return updateObject (state, {error: null, loading: false});
};

const authSuccess = (state, action) => {
  return updateObject (state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject (state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject (state, {token: null});
};

const fetchProductsStart = (state, action) => {
  return updateObject (state, {token: action.token});
};

// const setAuthRedirectPath = (state, action) => {
//   return updateObject (state, {
//     token: action.idToken,
//     userId: action.userId,
//     path: action.path,
//   });
// };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_CHECK_STATE_SERVER:
      return authStartServer (state, action);
    case actionTypes.AUTH_START:
      return authStart (state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess (state, action);
    case actionTypes.AUTH_FAIL:
      return authFail (state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout (state, action);
    case actionTypes.FETCH_PRODUCTS_START:
      return fetchProductsStart (state, action);
    // case actionTypes.SET_AUTH_REDIRECT_PATH:
    //   return setAuthRedirectPath (state, action);
    default:
      return state;
  }
};

export default authReducer;
