import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../SignIn/index';
import SignUpScreen from '../SignUp/index';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
