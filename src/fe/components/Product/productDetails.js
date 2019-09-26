import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {withRouter} from 'next/router';
import Link from 'next/link';
import * as Styled from '../../containers/Auth/StyledAuth';
// import Button from '../UI/Button/Button';

class ProductDetails extends Component {
  // handleClick = e => {
  //   e.preventDefault ();
  //   const {name, price, token} = this.props.router.query;
  //   const {list} = this.props;
  //   this.props.onAddToCart (event, token, list, name, price);
  // };

  render () {
    const {name, price} = this.props.router.query;
    return (
      <Styled.Auth>
        {name}
        <div>
          מחיר: <strong>{Number.parseFloat (price).toFixed (2)} ש"ח</strong>
        </div>
        {/* <Button btnType="Success" clicked={event => this.handleClick (event)}>
          הוסף לסל
        </Button>
        <Link
          href={{
            pathname: '/cart',
            query: {
              name: this.props.router.query.name,
              price: this.props.router.query.price,
              token: this.props.router.query.token,
              list: this.props.list,
            },
          }}
        >
          <a>צפייה בסל</a>
        </Link> */}
      </Styled.Auth>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.products.list,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddToCart: (event, token, list, name, price) => {
      dispatch (actions.addToCart (event, token, list, name, price));
    },
  };
};

export default compose (
  withRouter,
  connect (mapStateToProps, mapDispatchToProps)
) (ProductDetails);
