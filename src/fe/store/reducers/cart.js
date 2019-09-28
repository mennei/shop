import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  token: null,
  error: null,
  loading: false,
  myCart: [],
  name: '',
  price: 0,
  total: 0,
};

const fetchCartStart = state => {
  return updateObject (state, {error: null, loading: true, myCart: []});
};

const fetchCartSuccess = (state, action) => {
  return updateObject (state, {
    token: action.idToken,
    error: null,
    loading: false,
    myCart: action.myCart,
  });
};

const fetchCartFail = (state, action) => {
  return updateObject (state, {
    error: action.error,
    loading: false,
    myCart: [],
  });
};

const addToCartFail = (state, action) => {
  return updateObject (state, {
    error: action.error,
  });
};

const addToCartSuccess = (state, action) => {
  return updateObject (state, {
    token: action.idToken,
    error: null,
  });
};

const removeFromCartFail = (state, action) => {
  return updateObject (state, {
    error: action.error,
  });
};

const removeFromCartSuccess = (state, action) => {
  return updateObject (state, {
    token: action.idToken,
  });
};

const storeResult = (state, action) => {
  return updateObject (state, {
    myCart: state.myCart.concat ({
      id: new Date (),
      name: action.productName,
      price: action.productPrice,
    }),
    total: state.total + action.productPrice,
  });
};

const deleteResult = (state, action) => {
  return updateObject (state, {
    myCart: state.myCart.filter (
      product =>
        product.name !== action.productName &&
        product.price !== action.productPrice
    ),
    total: state.total - action.productPrice,
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
    case actionTypes.ADD_TO_CART_FAIL:
      return addToCartFail (state, action);
    case actionTypes.ADD_TO_CART_SUCCESS:
      return addToCartSuccess (state, action);
    case actionTypes.REMOVE_FROM_CART_FAIL:
      return removeFromCartFail (state, action);
    case actionTypes.REMOVE_FROM_CART_SUCCESS:
      return removeFromCartSuccess (state, action);
    case actionTypes.FETCH_CART_FAIL:
      return fetchCartFail (state, action);
    case actionTypes.STORE_RESULT:
      return storeResult (state, action);
    case actionTypes.DELETE_RESULT:
      return deleteResult (state, action);
    default:
      return state;
  }
};

export default cartReducer;
