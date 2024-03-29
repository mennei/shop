import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  token: null,
  error: null,
  loading: false,
  list: [],
};

const fetchProductsStart = state => {
  return updateObject (state, {error: null, loading: true, list: []});
};

const fetchProductsSuccess = (state, action) => {
  return updateObject (state, {
    token: action.token,
    error: null,
    loading: false,
    list: action.list,
  });
};

const fetchProductsFail = (state, action) => {
  return updateObject (state, {
    error: action.error,
    loading: false,
    list: [],
  });
};

const cartStart = (state, action) => {
  return updateObject (state, {
    token: action.idToken,
    list: [],
    name: '',
    price: 0,
    total: 0,
  });
};

const onSearch = (state, action) => {
  return updateObject (state, {list: action.list});
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return fetchProductsStart (state, action);
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess (state, action);
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return fetchProductsFail (state, action);
    case actionTypes.CART_START:
      return cartStart (state, action);
    case actionTypes.ON_SEARCH:
      return onSearch (state, action);
    default:
      return state;
  }
};

export default productsReducer;
