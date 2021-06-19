import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Text, View} from 'react-native';

const ProfileScreen = () => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        --- Profile Screen ---
      </Text>
    </View>
  );
};

export default ProfileScreen;
