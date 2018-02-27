import React, { Component } from 'react';

import { Formik, Field, FormikProps} from 'formik';
import {
  View,
  StyleSheet
} from 'react-native';

import syncValidation from '../../utils/forms/validation/syncValidation';
import TextInput from '../../components/Shared/Form/TextInput';
import Button from '../../components/Shared/Button/Button';
import { signIn } from '../../utils/authorizationToken';
import * as Styles from '../../styles/variables';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPostingData: false,
    };
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleSubmitForm(values, resetForm, formValues) {
    this.setState({
      isPostingData: true
    });

    return this.props.login(values)
    .then((result) => {
      this.setState({
        isPostingData: false
      });
      resetForm(this.props.formValues);
      if (result) {
        signIn(result.data.signin.token);
        this.props.navigation.navigate('Dashboard');
      }
    });
  }

  render() {

    const formValues = {
      email: '',
      password: ''
    }

    return (
      <Formik
        initialValues={formValues}
        validate={values => syncValidation(values)}
        onSubmit={(values, {
          resetForm
        }) => this.handleSubmitForm(values, resetForm, formValues)}
        render={props => (
          <View>
            <Field
              component={TextInput}
              name="email"
              label="EMAIL ADDRESS"
              placeholder="Enter your email address"
              onChangeText={props.setFieldValue}
              onBlurText={props.setFieldTouched}
            />
            <Field
              component={TextInput}
              style={styles.password}
              name="password"
              label="PASSWORD"
              placeholder="Enter your password"
              onChangeText={props.setFieldValue}
              onBlurText={props.setFieldTouched}
            />
            <Button
              onPress={props.handleSubmit}
              primary
              loading={this.state.isPostingData}
              letterSpacing={2}>
              LOG IN
            </Button>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  password: {
    marginBottom: (Styles.sizes.md + Styles.sizes.sm)
  }
});

export default LoginForm;
