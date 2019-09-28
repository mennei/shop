import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Product from '../../components/Product/product';
import * as Styled from '../../containers/Auth/StyledAuth';
import * as actions from '../../store/actions/index';
import Link from 'next/link';
import {withRouter} from 'next/router';

class Products extends Component {
  componentDidMount () {
    const {router, token, myCart, total} = this.props;
    let activeToken = token
      ? token
      : router && router.query && router.query.token
          ? router.query.token
          : null;
    this.props.onFetchProducts (activeToken, myCart, total);
  }

  render () {
    let products = <Spinner />;
    if (!this.props.loading && this.props.list) {
      products = this.props.list.map (dbProduct => {
        const {productHebName, price, _id} = dbProduct;
        return (
          <Styled.Auth key={_id}>
            <Product
              name={productHebName}
              price={price}
              token={this.props.token}
              list={this.props.list}
            />
            <Link
              href={{
                pathname: '/cart',
                query: {
                  token: this.props.token,
                  myCart: this.props.myCart,
                },
              }}
            >
              <a>צפייה בסל</a>
            </Link>
          </Styled.Auth>
        );
      });
    }
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>רשימת מוצרים</h1>
        <div>{products}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.products.list,
    loading: state.products.loading,
    token: state.products.token,
    myCart: state.cart.myCart,
    total: state.cart.total,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProducts: (token, myCart, total) =>
      dispatch (actions.fetchProducts (token, myCart, total)),
  };
};

export default compose (
  withRouter,
  connect (mapStateToProps, mapDispatchToProps)
) (Products);
