import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ToastAndroid,
  ScrollView,
  Platform,
  Modal,
  Image,
  Linking,
} from 'react-native';

import styles from './Styles';

import Users from '../../model/users';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../../components/context';

import * as Animatable from 'react-native-animatable';

import Feather from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [show, setShow] = React.useState(false);
  const [phoneNumber] = React.useState('+91-1234567890');
  const [mTitle, setTitle] = React.useState('SysteMatix');

  const { colors } = useTheme();

  const { signIn } = React.useContext(AuthContext);

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter(item => {
      return userName == item.username && password == item.password;
    });

    if (data.username.length == 0 || data.password.length == 0) {
      Platform.OS === 'ios'
        ? alert('Mobile Number or password cannot be empty...')
        : ToastAndroid.showWithGravity(
          'Mobile Number or password cannot be empty...',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      return;
    }

    if (data.password.length < 6) {
      Platform.OS === 'ios'
        ? alert('Password should be 6 digits...')
        : ToastAndroid.showWithGravity(
          'Password should be 6 digits...',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      return;
    }

    if (foundUser.length == 0) {
      Platform.OS === 'ios'
        ? alert('Username or password is incorrect...')
        : ToastAndroid.showWithGravity(
          'Username or Password is Incorrect!',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      return;
    }

    signIn(foundUser);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#02375a" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>{mTitle}</Text>
        <Text style={styles.text_header1}>Log In</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            Username
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Enter Username"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Username must be 4 characters long.
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
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
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 6 characters long.
              </Text>
            </Animatable.View>
          )}

          <TouchableOpacity
            onPress={() => {
              setShow(true), setTitle(`Forgot${'\n'}Password?`);
            }}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => loginHandle(data.username, data.password)}>
              <LinearGradient
                colors={['#05375a', '#05375a']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Log In
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
                Don't have a account?{''}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={styles.signup}>Sign up</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
              }}>
              <Modal transparent={true} visible={show.valueOf()}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    backgroundColor: '#e7e9ebaa',
                  }}
                  onPress={() => {
                    setShow(false), setTitle('SysteMatix');
                  }}>
                  <Image
                    style={{
                      width: 27,
                      height: 27,
                      padding: 10,
                      margin: 20,
                    }}
                    source={{
                      uri: 'https://www.iconsdb.com/icons/preview/gray/x-mark-5-xxl.png',
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#e7e9ebaa',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 20,
                      marginTop: 30,
                      width: '80%',
                      height: '47%',
                      padding: 20,
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{ width: 250, height: 200, marginTop: -120 }}
                      source={require('../../assets/think.png')}
                    />

                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        marginTop: -10,
                        fontWeight: 'bold',
                      }}>
                      Please kindly contact CUSTOMER CARE
                    </Text>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
                      <Image
                        style={{ width: 30, height: 30, marginEnd: 2.5 }}
                        source={require('../../assets/phone-call.png')}
                      />
                      <Text
                        style={{
                          color: '#FF0000',
                          fontSize: 21,
                          fontWeight: 'bold',
                          padding: 10,
                          textDecorationLine: 'underline',
                        }}>
                        +91-1234567890
                      </Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: 'black',
                        fontSize: 12,
                        marginTop: 20,
                        fontWeight: 'bold',
                      }}>
                      Already remember your password?
                    </Text>
                    <TouchableOpacity
                      style={[styles.buttonx]}
                      onPress={() => {
                        setShow(false),
                          setTitle('SysteMatix');
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 12,
                          fontWeight: '700',
                          marginTop: 4.5,
                        }}>
                        Login/Signup
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
