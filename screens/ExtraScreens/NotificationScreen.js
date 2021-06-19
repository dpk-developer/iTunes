import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Text, View} from 'react-native';

const NotificationScreen = () => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        --- Notification Screen ---
      </Text>
    </View>
  );
};

export default NotificationScreen;
