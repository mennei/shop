import fetch from 'isomorphic-unfetch';

import * as actionTypes from './actionTypes';
import {cartStart, fetchProducts} from './products';

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
    myCart: products,
  };
};

// export const removeFromCartFail = error => {
//   return {
//     type: actionTypes.REMOVE_FROM_CART_FAIL,
//     error: error,
//   };
// };

// export const removeFromCartSuccess = (idToken, products, totalCart) => {
//   return {
//     type: actionTypes.REMOVE_FROM_CART_SUCCESS,
//     token: idToken,
//     list: products,
//     total: totalCart,
//   };
// };

// export const fetchCheckoutStart = () => {
//   return {
//     type: actionTypes.FETCH_CHECKOUT_START,
//   };
// };

// export const fetchCheckoutSuccess = (token, userId, list, total) => {
//   return {
//     type: actionTypes.FETCH_CHECKOUT_SUCCESS,
//     idToken: token,
//     userId: userId,
//     list: list,
//     total: total,
//   };
// };

// export const fetchCheckoutFail = error => {
//   return {
//     type: actionTypes.FETCH_CHECKOUT_FAIL,
//     error: error,
//   };
// };

export const fetchCart = token => {
  return dispatch => {
    if (!token) {
      return dispatch (fetchCartFail ('Invalid token when fetching cart'));
    }
    const url = `${conf.BASE_API_PATH}cart/getCart`;
    fetch (url, {method: 'get'})
      .then (response => {
        let listPromise = response.json ();
        listPromise.then (
          data => {
            let list = data.cart;
            dispatch (fetchCartSuccess (token, list));
          },
          err => {
            dispatch (fetchCartFail (err));
          }
        );
      })
      .catch (err => dispatch (fetchCartFail (err)));
  };
};

export const addToCartFail = error => {
  return {
    type: actionTypes.ADD_TO_CART_FAIL,
    error: error,
  };
};

export const addToCartSuccess = (
  idToken,
  products,
  productName,
  productPrice
) => {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    token: idToken,
    name: productName,
    price: productPrice,
    myCart: products,
  };
};

export const storeResult = (name, price, list, total) => {
  return {
    type: actionTypes.STORE_RESULT,
    productName: name,
    productPrice: price,
    myCart: list,
    totalCart: total,
  };
};

export const addToCart = (e, token, myCart, name, price, total) => {
  return dispatch => {
    if (!token) {
      return dispatch (addToCartFail ('Invalid token when add item to cart'));
    } else {
      dispatch (cartStart (token, myCart));
      dispatch (addToCartSuccess (token, myCart, name, price));
      dispatch (storeResult (name, price, myCart, total));
      dispatch (fetchProducts (token));
    }
  };
};

// export const removeFormCart = (token, list, itemId) => {
//   return dispatch => {
//     if (!token) {
//       return dispatch (
//         removeToCartFail ('Invalid token when remove item from cart')
//       );
//     } else {
//       if (!itemId) {
//         list.splice (itemId);
//         let total = 0;
//         for (let item in list) {
//           total += item.price;
//         }
//         return dispatch (removeFromCartSuccess (token, list, total));
//       } else {
//         return dispatch (removeToCartFail ('itemId is null'));
//       }
//     }
//   };
// };

// export const checkout = (token, list, total) => {
//   return dispatch => {
//     dispatch (checkoutStart ());
//     if (!token) {
//       return dispatch (checkoutFail ('Invalid token when checkout'));
//     }
//     let url = `${conf.BASE_API_PATH}authoristion/verifyToken`;
//     fetch (url, {method: 'post', body: {token: token}})
//       .then (response => {
//         let tokePromise = response.json ();
//         tokePromise.then (
//           data => {
//             let token = data.token;
//             if (!token) {
//               authSuccess (token, token.username);
//               const checkoutData = {
//                 username: token.username,
//                 list: list,
//                 total: total,
//               };
//               url = `${conf.BASE_API_PATH}cart/checkout`;
//               fetch (url, {method: 'post', body: JSON.stringify (checkoutData)})
//                 .then (response => {
//                   let checkoutPromise = response.json ();
//                   checkoutPromise.then (
//                     data => {
//                       let id = data.cart;
//                       if (!id) {
//                         dispatch (
//                           checkoutSuccess (
//                             token,
//                             checkoutData.username,
//                             checkoutData.list,
//                             checkoutData.total
//                           )
//                         );
//                       } else {
//                         dispatch (
//                           checkoutFail ('.ארעה שגיאה בהכנסת הנתונים, נסה שוב')
//                         );
//                       }
//                     },
//                     err => {
//                       dispatch (checkoutFail (err));
//                     }
//                   );
//                 })
//                 .catch (err => dispatch (checkoutFail (err)));
//             } else {
//               authFail ('הגישה נדחתה');
//             }
//           },
//           err => {
//             dispatch (authFail (err));
//           }
//         );
//       })
//       .catch (err => dispatch (authFail (err)));
//   };
// };
