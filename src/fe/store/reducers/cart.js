import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
import {cartStart} from '../actions/products';

const initialState = {
  token: null,
  error: null,
  loading: false,
  list: [],
  name: '',
  price: 0,
  total: 0,
};

const fetchCartStart = state => {
  return updateObject (state, {error: null, loading: true, list: []});
};

const fetchCartSuccess = (state, action) => {
  return updateObject (state, {
    token: action.idToken,
    error: null,
    loading: false,
    list: action.list,
  });
};

const fetchCartFail = (state, action) => {
  return updateObject (state, {
    error: action.error,
    loading: false,
    list: [],
  });
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CART_START:
      return fetchCartStart (state, action);
    case actionTypes.FETCH_CART_SUCCESS:
      return fetchCartSuccess (state, action);
    case actionTypes.FETCH_CART_FAIL:
      return fetchCartFail (state, action);
    default:
      return state;
  }
};

export default cartReducer;
