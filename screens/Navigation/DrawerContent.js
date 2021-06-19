import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../../components/context';

export function DrawerContent(props) {
  useEffect(async () => {
    handleName();
  }, []);

  const paperTheme = useTheme();

  const { signOut, toggleTheme } = React.useContext(AuthContext);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleName = async () => {
    const userName = await AsyncStorage.getItem('userName');
    const userEmail = await AsyncStorage.getItem('userEmail');
    setName(userName);
    setEmail(userEmail);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{ flexDirection: 'row', marginStart: -10, marginTop: 15 }}>
              <Avatar.Image
                source={require('../../assets/app_logo.png')}
                size={80}
                style={{
                  backgroundColor: '#02375a',
                  borderRadius: 360,
                  borderColor: 'green',
                  borderWidth: 2,
                }}
              />
              <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                <Title style={styles.title}>{name}</Title>
                <Caption style={styles.caption}>{email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bell-outline" color={color} size={size} />
              )}
              label="Notifications"
              onPress={() => {
                props.navigation.navigate('Notifications');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="tools" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Section title="Preferences">
          <TouchableRipple
            onPress={() => {
              toggleTheme();
            }}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={paperTheme.dark} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={async () => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 12,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
