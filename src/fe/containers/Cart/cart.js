import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Product from '../../components/Product/product';
import * as actions from '../../store/actions/index';
import {withRouter} from 'next/router';

class Cart extends Component {
  componentDidMount () {
    const {router, token} = this.props;
    console.log (router);
    let activeToken = token
      ? token
      : router && router.query && router.query.token
          ? router.query.token
          : null;
    this.props.onFetchCart (activeToken);
  }
  render () {
    let products = <Spinner />;
    if (!this.props.loading) {
      products = this.props.list.map (product => {
        const {productHebName, price} = product;
        <Product key={product._id} name={productHebName} price={price} />;
      });
    }
    if (products.length > 0) {
      products = <div>העגלה ריקה</div>;
    }
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>העגלה שלי</h1>
        <div>{products}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.cart.list,
    loading: state.cart.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCart: token => dispatch (actions.fetchCart (token)),
  };
};
export default compose (
  withRouter,
  connect (mapStateToProps, mapDispatchToProps)
) (Cart);
