import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {withRouter} from 'next/router';
import * as Styled from '../Auth/StyledAuth';
import Button from '../../components/UI/Button/Button';

class Cart extends Component {
  componentDidMount () {
    const {router, token} = this.props;
    let activeToken = token
      ? token
      : router && router.query && router.query.token
          ? router.query.token
          : null;
    this.props.onFetchCart (activeToken);
  }

  handelPaymentClick = e => {
    e.preventDefault ();
    let payment = 0;
    if (!this.props.total) {
      payment = <h3 style={{color: 'green'}}>סה"כ:{this.props.total}</h3>;
    }
    return <div>{payment}</div>;
  };

  render () {
    let products = <Spinner />;
    if (!this.props.loading && this.props.list && this.props.list[0]) {
      products = (
        <div>
          <h3>מוצרים בעגלה</h3>
          <div>מספר מוצר:{this.props.list[0].list[0].itemId}</div>
          <div>שם:{this.props.list[0].list[0].name}</div>
          <div>
            מחיר:
            {' '}
            <strong>
              {Number.parseFloat (this.props.list[0].list[0].price).toFixed (2)}
              {' '}
              ש"ח
            </strong>
          </div>
        </div>
      );
    }
    if (!this.props.list || this.props.list.length === 0) {
      products = <div>העגלה ריקה</div>;
    }
    let newProduct = null;
    if (this.props.name && this.props.price) {
      newProduct = (
        <div>
          <h3>מוצר חדש</h3>
          <div>שם:{this.props.name}</div>
          <div>
            מחיר:
            {' '}
            <strong>
              {Number.parseFloat (this.props.price).toFixed (2)} ש"ח
            </strong>
          </div>
        </div>
      );
    }
    return (
      <Styled.Auth>
        <h1>העגלה שלי</h1>
        <div>{products}</div>
        <div>{newProduct}</div>
        <Button btnType="Success" clicked={e => this.handelPaymentClick (e)}>
          לתשלום
        </Button>
        <button
          onClick={(name, price, list) =>
            this.props.onStoreResult (
              this.props.name,
              this.props.price,
              this.props.list
            )}
        >
          שמור עגלה
        </button>
        <ul>
          {this.props.list
            ? this.props.list.map (strResult => (
                <li key={new Date ()}>{strResult}</li>
              ))
            : null}
        </ul>
      </Styled.Auth>
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
    onStoreResult: (name, price, list) =>
      dispatch (actions.storeResult (name, price, list)),
  };
};
export default compose (
  withRouter,
  connect (mapStateToProps, mapDispatchToProps)
) (Cart);
