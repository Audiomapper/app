import React from 'react';
import SpacedText from 'react-native-letter-spacing';
import {
  Platform,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  View
} from 'react-native';

import Background from './images/bg.jpg';
import Logo from './images/logo.png';
import LoginFormWithData from './LoginFormWithData';
import Button from '../../components/Shared/Button/Button';
import SplitLine from '../../components/Shared/SplitLine/SplitLine';
import { LetterSpacing } from '../../components/Shared/LetterSpacing/LetterSpacing';
import * as Styles from '../../styles/variables';

const Login = ({
  navigation
}) => (
  <ImageBackground
    source={Background}
    style={styles.background}>
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.logo} />
      <LoginFormWithData navigation={navigation} />
      <SplitLine>
        OR
      </SplitLine>
      <Button
        primary
        buttonStyle={styles.facebook}
        letterSpacing={2}>
        LOG IN WITH FACEBOOK
      </Button>
      <Button
        primary
        buttonStyle={styles.google}
        noMargin
        letterSpacing={2}>
        LOG IN WITH GOOGLE
      </Button>
    </View>
    <View style={styles.footer}>
      <LetterSpacing
        onPress={() => navigation.navigate('Register')}
        textStyle={styles.createAccount}
        spacing={2}>
        CREATE ACCOUNT
      </LetterSpacing>
      <LetterSpacing
        textStyle={styles.lostPassword}
        spacing={2}>
        LOST PASSWORD ?
      </LetterSpacing>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212d3b'
  },
  container: {
    width: '70%'
  },
  logo: {
    alignSelf: 'center',
    width: 110,
    height: 125,
    marginTop: -40,
    marginBottom: (Styles.sizes.md + Styles.sizes.sm)
  },
  facebook: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  google: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  footer: {
    height: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(18, 28, 35, 0.2)',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: Styles.sizes.sm,
    paddingRight: Styles.sizes.sm
  },
  lostPassword: {
    fontSize: Styles.fontSizes.small,
    color: '#bbb'
  },
  createAccount: {
    fontSize: Styles.fontSizes.small,
    color: '#bbb'
  }
});

export default Login;
