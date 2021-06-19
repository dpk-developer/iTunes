import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ToastAndroid,
  ScrollView,
  StatusBar,
} from 'react-native';
import styles from './Styles';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {AuthContext} from '../../components/context';

class Helper {
  static isEmailValid(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) == 0;
  }
}

const SignUpScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    check_textInputChange1: false,
    check_textInputChange2: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const {signIn} = React.useContext(AuthContext);

  const textInputChange = val => {
    if (val.length > 1) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const textInputChangeEmail = val => {
    if (Helper.isEmailValid(val)) {
      return setData({
        ...data,
        email: val,
        check_textInputChange1: false,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange1: true,
      });
    }
  };

  const textInputChangeMobile = val => {
    if (val.length > 9) {
      setData({
        ...data,
        mobile: val,
        check_textInputChange2: true,
      });
    } else {
      setData({
        ...data,
        mobile: val,
        check_textInputChange2: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const handleSubmit = async () => {
    var mMobile = data.mobile;
    var mPass = data.password;
    var mEmail = data.email;
    var mName = data.username;

    if (mName.length < 2) {
      return Platform.OS === 'ios'
        ? alert('Name should more than 2 characters...')
        : ToastAndroid.showWithGravity(
            'Name should more than 2 characters...',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
    }

    if (Helper.isEmailValid(mEmail)) {
      return Platform.OS === 'ios'
        ? alert('Enter Valid Email...')
        : ToastAndroid.showWithGravity(
            'Enter Valid Email...',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
    }

    if (mMobile.length <= 9) {
      return Platform.OS === 'ios'
        ? alert('Mobile is not valid...')
        : ToastAndroid.showWithGravity(
            'Mobile is not valid...',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
    }

    if (mPass.length < 6 || data.confirm_password.length < 6) {
      return Platform.OS === 'ios'
        ? alert('Minimum Password Lenght is 6 digits...')
        : ToastAndroid.showWithGravity(
            'Minimum Password Lenght is 6 digits...',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
    }

    if (mPass != data.confirm_password) {
      return Platform.OS === 'ios'
        ? alert('Password not Matched...')
        : ToastAndroid.showWithGravity(
            'Password not Matched...',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#02375a" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Sign Up</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={styles.text_footer_mobile}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChangeEmail(val)}
            />
            {data.check_textInputChange1 ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={styles.text_footer_mobile}>Mobile Number</Text>
          <View style={styles.action}>
            <FontAwesome name="mobile" color="#05375a" size={25} />
            <TextInput
              placeholder="Your Mobile Number"
              placeholderTextColor="#666666"
              keyboardType="phone-pad"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChangeMobile(val)}
            />
            {data.check_textInputChange2 ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 10,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="green" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 10,
              },
            ]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="green" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => handleSubmit()}>
              <LinearGradient
                colors={['#02375a', '#02375a']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#000000',
                  marginTop: 15,
                  marginEnd: -5,
                }}>
                Already have a account?{''}
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.signup}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;