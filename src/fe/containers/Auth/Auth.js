import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

//import ProductList from '../Products/ProductsList';
import * as Styled from './StyledAuth';

import Link from 'next/link';

class Auth extends Component {
  state = {
    controls: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        label: 'Please type your username',
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 8,
        },
        valid: false,
        touched: false,
        label: 'Please type your password',
      },
    },
    isSignup: true,
  };

  componentDidMount () {
    if (this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath ();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity (
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState ({controls: updatedControls});
  };

  checkValidity (value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim () !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  submitHandler = event => {
    event.preventDefault ();
    if (
      this.state.controls.username.valid &&
      this.state.controls.password.valid
    ) {
      this.props.onAuth (
        this.state.controls.username.value,
        this.state.controls.password.value,
        this.state.isSignup
      );
    } else {
      this.props.onError ('Invalid Credentials');
    }
    this.props.onLogin (this.props.token);
    // Router.push (`/products?store=${props.store}`);
    // console.log (this.props);
    //props.store.dispatch (push ('/products'));
  };

  switchAuthModeHandler = () => {
    this.setState (prevState => {
      return {isSignup: !prevState.isSignup};
    });
  };

  render () {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push ({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map (formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler (event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    if (!this.props.isAuthenticated) {
      form = (
        <Styled.Auth>
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="Success">SUBMIT</Button>
          </form>
          <Button clicked={this.switchAuthModeHandler} btnType="Danger">
            SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
          </Button>
        </Styled.Auth>
      );
    }
    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Link to={this.props.authRedirectPath}><a>login</a></Link>;
    }
    // let productsList = null;
    // if (this.props.isAuthenticated) {
    //   productsList = (
    //     <Styled.Auth>
    //       <h1>רשימת מוצרים</h1>
    //       <ProductList />
    //     </Styled.Auth>
    //   );
    // }

    return (
      <div>
        {authRedirect}
        {errorMessage}
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isSignup: state.auth.isSignup,
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password, isSignup) =>
      dispatch (actions.auth (username, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch (actions.setAuthRedirectPath ('/')),
    onError: error => dispatch (actions.authFail (error)),
    onLogin: token => dispatch (actions.fetchProducts (token)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (Auth);
