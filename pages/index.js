import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import Layout from '../src/fe/hoc/Layout/Layout';
import Auth from '../src/fe/containers/Auth/Auth';
import authReducer from '../src/fe/store/reducers/auth';
import productsReducer from '../src/fe/store/reducers/products';

const composeEnhancers =
  (typeof window != 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const rootReducer = combineReducers ({
  auth: authReducer,
  products: productsReducer,
});

const store = createStore (
  rootReducer,
  composeEnhancers (applyMiddleware (thunk))
);

const Index = () => (
  <Provider store={store}>
    <Layout>
      <Auth />
    </Layout>
  </Provider>
);

export default Index;
