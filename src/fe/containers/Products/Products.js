import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Product from '../../components/Product/product';
import * as actions from '../../store/actions/index';
import {withRouter} from 'next/router';

class Products extends Component {
  componentDidMount () {
    const {router, token} = this.props;
    // console.log (router);
    let activeToken = token
      ? token
      : router && router.query && router.query.token
          ? router.query.token
          : null;
    this.props.onFetchProducts (activeToken);
  }

  render () {
    let products = <Spinner />;
    if (!this.props.loading) {
      products = this.props.list.map (product => {
        const {productHebName, price} = product;
        return (
          <div>
            <Product
              key={product._id}
              name={productHebName}
              price={price}
              token={this.props.token}
              list={this.props.list}
            />
          </div>
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
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProducts: token => dispatch (actions.fetchProducts (token)),
  };
};

export default compose (
  withRouter,
  connect (mapStateToProps, mapDispatchToProps)
) (Products);
