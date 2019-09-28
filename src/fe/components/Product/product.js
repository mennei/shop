import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {withRouter} from 'next/router';
import Link from 'next/link';
import Button from '../../components/UI/Button/Button';

class Product extends Component {
  handleAddClick = e => {
    e.preventDefault ();
    const {token, myCart, name, price, total} = this.props;
    this.props.onAddToCart (e, token, myCart, name, price, total);
  };

  handleRemoveClick = e => {
    e.preventDefault ();
    const {token, myCart, price, total} = this.props;
    this.props.onRemoveFromCart (e, token, myCart, name, price, total);
  };

  render () {
    return (
      <div>
        {this.props.name}
        <div>
          מחיר:
          {' '}
          <strong>
            {Number.parseFloat (this.props.price).toFixed (2)} ש"ח
          </strong>
        </div>
        {' '}
        <Button btnType="Success" clicked={e => this.handleAddClick (e)}>
          הוסף לסל
        </Button>
        <Button btnType="Success" clicked={e => this.handleRemoveClick (e)}>
          הורד מהסל
        </Button>
        <Link
          href={{
            pathname: '/products/[id]/product',
            query: {
              name: this.props.name,
              price: this.props.price,
              // token: props.token,
              // list: this.props.list,
            },
          }}
        >
          <a>דף פרטי מוצר</a>
        </Link>
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
    onAddToCart: (e, token, myCart, name, price, total) => {
      dispatch (actions.addToCart (e, token, myCart, name, price, total));
    },
    onRemoveFromCart: (e, token, myCart, name, price, total) => {
      dispatch (actions.removeFromCart (e, token, myCart, name, price, total));
    },
  };
};

export default compose (
  withRouter,
  connect (mapStateToProps, mapDispatchToProps)
) (Product);
