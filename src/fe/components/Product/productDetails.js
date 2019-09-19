import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import * as actions from '../../store/actions/index';
import Link from 'next/link';
import * as Styled from '../../containers/Auth/StyledAuth';
import {Button} from '../UI/Button/StyledButton';

class ProductDetails extends Component {
  render () {
    console.log (this.props);
    const {name, price, token, list} = this.props;
    return (
      <Styled.Auth>
        {name}
        <div>
          מחיר: <strong>{Number.parseFloat (price).toFixed (2)} ש"ח</strong>
        </div>
        <Button
          btnType="Success"
          clicked={(token, list) => this.props.onAddItemToCart (token, list)}
        >
          הוסף לסל
        </Button>
        <Link
          href={{
            pathname: '/cart',
            query: {
              name: name,
              price: price,
              token: token,
              list: list,
            },
          }}
        >
          <a>צפייה בסל</a>
        </Link>
      </Styled.Auth>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     name: state.cart.name,
//     price: state.cart.name,
//     list: state.cart.list,
//     token: state.auth.token,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddItemToCart: (token, list) =>
//       dispatch (actions.addItemToCart (token, list)),
//   };
// };
export default ProductDetails;
