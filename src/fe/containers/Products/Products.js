import React, {Component} from 'react';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Product from '../../components/Product/product';
import * as actions from '../../store/actions/index';

class Products extends Component {
  componentDidMount () {
    this.props.onFetchProducts (this.props.token);
  }

  render () {
    let products = <Spinner />;
    if (!this.props.loading) {
      products = this.props.list.map (product => (
        <Product
          key={product._id}
          name={product.productHebName}
          price={product.price}
        />
      ));
    }
    return (
      <div>
        {products}
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
export default connect (mapStateToProps, mapDispatchToProps) (Products);
