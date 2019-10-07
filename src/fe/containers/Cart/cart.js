import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {withRouter} from 'next/router';
import * as Styled from '../Auth/StyledAuth';

class Cart extends Component {
  componentDidMount () {
    const {router, myCart, total} = this.props;
    let activeToken = router && router.query && router.query.token
      ? router.query.token
      : null;
    this.props.onFetchCart (activeToken, myCart, total);
  }

  render () {
    let products = <Spinner />;
    if (
      !this.props.loading &&
      (!this.props.list || this.props.list.length === 0) &&
      (!this.props.myCart || this.props.myCart.length === 0)
    ) {
      products = <div>העגלה ריקה</div>;
    }
    if (
      !this.props.loading &&
      this.props.list &&
      this.props.list[0].length > 0
    ) {
      products = (
        <div key={new Date ().getMilliseconds () * Math.random ()}>
          <h3>מוצרים בעגלה</h3>
          <div>שם:{this.props.list[0].name}</div>
          <div>
            מחיר:
            {' '}
            <strong>
              {Number.parseFloat (this.props.list[0].price).toFixed (2)}
              {' '}
              ש"ח
            </strong>
          </div>
        </div>
      );
    }
    if (
      !this.props.loading &&
      this.props.myCart &&
      this.props.myCart.length > 0
    ) {
      products = this.props.myCart.map (product => {
        return (
          <div key={new Date ().getMilliseconds () * Math.random ()}>
            <h3>מוצר חדש</h3>
            <div>שם:{product.name}</div>
            <div>
              מחיר:
              {' '}
              <strong>
                {Number.parseFloat (product.price).toFixed (2)} ש"ח
              </strong>
            </div>
          </div>
        );
      });
    }

    let payment = null;
    if (this.props.total) {
      payment = (
        <h3 style={{color: 'green'}}>סה"כ לתשלום: {this.props.total} ש"ח</h3>
      );
    }

    return (
      <Styled.Auth>
        <h1>העגלה שלי</h1>
        <div>{products}</div>
        <div>{payment}</div>
      </Styled.Auth>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.products.token,
    loading: state.cart.loading,
    list: state.cart.list,
    myCart: state.cart.myCart,
    loading: state.cart.loading,
    total: state.cart.total,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCart: (token, myCart, total) =>
      dispatch (actions.fetchCart (token, myCart, total)),
  };
};
export default compose (
  withRouter,
  connect (mapStateToProps, mapDispatchToProps)
) (Cart);
