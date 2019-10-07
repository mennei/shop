import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Product from '../../components/Product/product';
import * as Styled from '../../containers/Auth/StyledAuth';
import * as actions from '../../store/actions/index';
import Link from 'next/link';
import {withRouter} from 'next/router';
import Input from '../../components/UI/Input/Input';

class Products extends Component {
  state = {
    search: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'הקלד לחיפוש מוצר',
      },
      value: '',
      validation: {
        isHebChars: true,
      },
      valid: false,
      touched: false,
      label: 'Please type your search',
      filter: [...this.props.list],
    },
  };

  componentDidMount () {
    const {router, token, myCart, total} = this.props;
    let activeToken = token
      ? token
      : router && router.query && router.query.token
          ? router.query.token
          : null;
    this.props.onFetchProducts (activeToken, myCart, total);
  }

  handleChangeSearch = e => {
    const updatedControl = {
      ...this.state.search,
      value: e.target.value,
      valid: this.checkValidity (e.target.value, this.state.search.validation),
      touched: true,
      filter: this.doFilter (e.target.value),
    };
    this.setState ({search: updatedControl});
  };

  checkValidity (value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.isHebChars) {
      isValid = /^[ אבגדהוזחטיכלמנסעמצפקרשתףץןם]+$/.test (value) && isValid;
    }
    return isValid;
  }

  doFilter (value) {
    let currentList = [...this.props.list];
    let newList = [...this.props.list];
    if (value !== '') {
      newList = currentList.filter (item =>
        item.productHebName.includes (value)
      );
    } else {
      newList = [...this.props.list];
    }
    console.log (newList);
    return newList;
  }

  render () {
    let products = <Spinner />;
    if (!this.props.loading && this.props.list) {
      console.log (this.state.search.filter);
      products = this.state.search.filter.map (dbProduct => {
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
        <Input
          elementType={this.state.search.elementType}
          elementConfig={this.state.search.elementConfig}
          value={this.state.search.value}
          invalid={!this.state.search.valid}
          shouldValidate={this.state.search.validation}
          touched={this.state.search.touched}
          changed={e => this.handleChangeSearch (e)}
        />
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
