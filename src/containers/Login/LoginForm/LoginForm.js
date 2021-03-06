import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withApollo, compose } from 'react-apollo';
import {
  View
} from 'react-native';

import TextInput from '~/components/Shared/Form/TextInput';
import Button from '~/components/Shared/Button/Button';
import { password, required, maxLength, email } from '~/utils/forms/validation/fieldValidation';
import { logInUser } from '~/utils/authorization/userAuthorization';
import helpers from '~/styles/helpers';

const emailValidation = [
  required('Email'),
  maxLength('Email'),
  email
];

export class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPostingData: false
    };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    this.setState({
      isPostingData: true
    });

    return this.props.login(values)
      .then((result) => {
        this.setState({
          isPostingData: false
        });
        if (result) {
          logInUser(result.data.signin);
          this.props.navigation.navigate('Dashboard');
        }
      });
  }

  render() {

    const {
      handleSubmit
    } = this.props;

    return (
      <View>
        <Field
          component={TextInput}
          name="email"
          label="EMAIL ADDRESS"
          placeholder="Enter your email address"
          validate={emailValidation}
        />
        <Field
          component={TextInput}
          validate={password}
          autoComplete="off"
          style={helpers.marginBottom}
          name="password"
          label="PASSWORD"
          placeholder="Enter your password"
        />
        <Button
          onPress={handleSubmit(this.submitForm)}
          primary
          loading={this.state.isPostingData}
          letterSpacing={2}>
          LOG IN
        </Button>
      </View>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  login: PropTypes.func,
};

const withReduxForm = reduxForm({
  form: 'loginForm',
  enableReinitialize: true
});

export default compose(
  withApollo,
  withReduxForm
)(LoginForm);
