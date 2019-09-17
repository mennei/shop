import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../src/fe/store/actions/index';
import Layout from '../src/fe/hoc/Layout/Layout';
import Auth from '../src/fe/containers/Auth/Auth';
import Products from '../src/fe/containers/Products/Products';

class Index extends React.Component {
  static getInitialProps({reduxStore, req}) {
    const isServer = !!req;
    reduxStore.dispatch (actions.authCheckStateServer (isServer));
    return {};
  }

  componentDidMount () {
    this.props.onTryAutoSignup (localStorage);
  }

  render () {
    let routes = (
      <Layout>
        <Auth />
      </Layout>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Layout>
          <h1 style={{textAlign: 'center'}}>רשימת מוצרים</h1>
          <Products />
        </Layout>
      );
    }
    return <div>{routes}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: localStorage =>
      dispatch (actions.authCheckState (localStorage)),
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (Index);
