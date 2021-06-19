import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
  Image,
  RefreshControl,
  TextInput,
  ToastAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { useTheme } from '@react-navigation/native';

import TrackPlayer from 'react-native-track-player';

const HomeScreen = () => {
  const theme = useTheme();
  const { colors } = useTheme();
  const [load, setLoad] = useState('0');
  const [data, setData] = useState([]);
  const [initialState] = useState('songs');
  const [getSeaarchItem, setSearchItem] = useState('');
  const [getsetSearchInput, setSearchInput] = useState('');

  useEffect(() => {
    getsetSearchInput === '' ? handleItunesSearch(initialState) : '';
    return async () => {
      await TrackPlayer.stop();
    };
  }, []);

  const handleItunesSearch = async searchTerm => {
    await fetch(`https://itunes.apple.com/search?term=${searchTerm}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        setSearchItem(responseJson.resultCount);
        setData(responseJson.results);
        console.log('isLoading ? ...', data);
        if (responseJson.results.length > 1) {
          setLoad('1');
        }
        console.log('Log Search Response:- ', responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handlePlaySong = async (previewUrl, trackName) => {
    if (previewUrl == undefined) {
      Platform.OS === 'ios'
        ? alert('This Song can not be Play...Try Again!')
        : ToastAndroid.showWithGravity(
          'This Song can not be Play...Try Again!',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      return;
    }

    Platform.OS === 'ios'
      ? alert(`Playing Track : ${trackName}`)
      : ToastAndroid.showWithGravity(
        `Playing Track : ${trackName}`,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );

    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      url: previewUrl,
    });
    await TrackPlayer.play();
  };

  const _renderItem = ({ item, key }) => {
    return (
      (key = { key }),
      (
        <TouchableOpacity
          style={{
            width: '47%',
            borderRadius: 8,
            elevation: 8,
            margin: 5,
            padding: 10,
            backgroundColor: theme.dark ? '#000000' : '#02375a',
          }}
          onPress={() => handlePlaySong(item.previewUrl, item.trackName)}>
          <Image
            source={{ uri: item.artworkUrl100 }}
            resizeMode="cover"
            style={{
              borderRadius: 360,
              height: 100,
              width: 100,
              alignSelf: 'center',
              marginBottom: 10,
            }}
          />

          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              margin: 2.5,
              textTransform: 'capitalize',
            }}>
            Track : {item.trackName}.
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              margin: 2.5,
              textTransform: 'capitalize',
            }}>
            Artist : {item.artistName}.
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              margin: 2.5,
              textTransform: 'capitalize',
            }}>
            Collection : {item.collectionCensoredName}.
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              margin: 2.5,
              textTransform: 'capitalize',
            }}>
            Song Price: ${item.trackPrice}.
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              margin: 2.5,
              textTransform: 'capitalize',
            }}>
            Collection Price: ${item.collectionPrice}.
          </Text>
        </TouchableOpacity>
      )
    );
  };

  const searchComponent = () => {
    return (
      <View style={styles.search}>
        <StatusBar
          backgroundColor={theme.dark ? '#000000' : '#02375a'}
          barStyle={theme.dark ? 'light-content' : 'light-content'}
        />
        <TextInput
          placeholder="Search Here ..."
          placeholderTextColor={theme.dark ? '#222222' : '#f0f0f0'}
          style={[
            styles.textInput,
            {
              color: theme.dark ? '#222222' : 'white',
              backgroundColor: theme.dark ? '#CACACA' : '#222222',
            },
          ]}
          autoCapitalize="none"
          onChangeText={val => setSearchInput(val)}
        />

        <TouchableOpacity
          style={{
            backgroundColor: theme.dark ? '#CACACA' : '#02375a',
            width: '30%',
            padding: 14,
            borderRadius: 8,
          }}
          onPress={() => handleItunesSearch(getsetSearchInput)}>
          <Text
            style={[
              styles.textSearch,
              {
                color: theme.dark ? '#222222' : 'white',
              },
            ]}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (load === '0') {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {searchComponent()}

        <View style={styles.no_data}>
          <Text
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              color: colors.text,
              fontWeight: 'bold',
              padding: 10,
              fontSize: 20,
            }}>
            --- Sorry No Data Found ---
          </Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {searchComponent()}

        <Text style={{ color: colors.text }}>
          Total search results found :- {getSeaarchItem}{' '}
        </Text>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={_renderItem}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleItunesSearch} />
          }
          ListHeaderComponent={<View style={{ width: '100%', height: 25 }} />}
          ListFooterComponent={<View style={{ width: '100%', height: 25 }} />}
        />
      </SafeAreaView>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  no_data: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '62%',
    padding: 10,
    marginEnd: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  textSearch: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
