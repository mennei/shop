import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as Styled from './StyledAuth';

class Auth extends Component {
  state = {
    controls: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'username',
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

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }

    return (
      <Styled.Auth>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </Styled.Auth>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isSignup: state.auth.isSignup,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password, isSignup) =>
      dispatch (actions.auth (username, password, isSignup)),
    onError: error => dispatch (actions.authFail (error)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (Auth);
