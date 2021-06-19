import React from 'react';

import { useTheme } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const HomeStack = createStackNavigator();
const DummyStack = createStackNavigator();
const BottomTabStack = createMaterialBottomTabNavigator();

import HomeScreen from '../Home/index';
import ExploreScreen from '../ExtraScreens/SettingScreen';
import ProfileScreen from '../ExtraScreens/ProfileScreen';
import NotificationScreen from '../ExtraScreens/NotificationScreen';

const MainTabScreen = () => {
  const theme = useTheme();

  return (
    <BottomTabStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.dark ? '#000000' : '#02375a',
        },
        headerTintColor: '#fff',
      }}>
      <BottomTabStack.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'HOME',
          tabBarColor: theme.dark ? '#000000' : '#02375a',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <BottomTabStack.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarColor: theme.dark ? '#000000' : '#02375a',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <BottomTabStack.Screen
        name="Notifications"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: 'NOTIFICATIONS',
          tabBarColor: theme.dark ? '#000000' : '#02375a',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <BottomTabStack.Screen
        name="Settings"
        component={SettingStackScreen}
        options={{
          tabBarLabel: 'SETTINGS',
          tabBarColor: theme.dark ? '#000000' : '#02375a',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-options" color={color} size={26} />
          ),
        }}
      />
    </BottomTabStack.Navigator>
  );
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation, theme = useTheme() }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.dark ? '#000000' : '#02375a',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'HOME',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={theme.dark ? '#000000' : '#02375a'}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const SettingStackScreen = ({ navigation, theme = useTheme() }) => (
  <DummyStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.dark ? '#000000' : '#02375a',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DummyStack.Screen
      name="Setting"
      component={ExploreScreen}
      options={{
        title: 'SETTING',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={theme.dark ? '#000000' : '#02375a'}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </DummyStack.Navigator>
);

const ProfileStackScreen = ({ navigation, theme = useTheme() }) => (
  <DummyStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.dark ? '#000000' : '#02375a',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DummyStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'PROFILE',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={theme.dark ? '#000000' : '#02375a'}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </DummyStack.Navigator>
);

const NotificationStackScreen = ({ navigation, theme = useTheme() }) => (
  <DummyStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.dark ? '#000000' : '#02375a',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DummyStack.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        title: 'NOTIFICATION',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={theme.dark ? '#000000' : '#02375a'}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </DummyStack.Navigator>
);
