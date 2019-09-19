import React, {Component} from 'react';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Product from '../../components/Product/product';
import * as actions from '../../store/actions/index';

class Cart extends Component {
  componentDidMount () {
    this.props.onFetchCart (this.props.token);
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
export default connect (mapStateToProps, mapDispatchToProps) (Cart);
