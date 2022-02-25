import {
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import React from 'react';
import {Container, Text} from '../../components/elements';
import TracksList from './TrackList/TrackList';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

const MusicPlayer = () => {
  const {colors} = useTheme();
  const [itemId, setItemId] = React.useState(0);
  // redux
  const {songs} = useSelector(state => state.userReducer);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.flatRenderItem,
          {
            backgroundColor:
              item.id == itemId ? colors.primary : colors.background,
          },
        ]}
        onPress={() => setItemId(item.id)}>
        <Container
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: item.fileCopyUri
                ? item.fileCopyUri
                : 'https://www.freepnglogos.com/uploads/apple-music-logo-circle-png-28.png',
            }}
          />
        </Container>
        <Container
          style={{
            paddingHorizontal: 10,
            flex: 1,
            backgroundColor:
              item.id == itemId ? colors.primary : colors.background,
          }}>
          <Text style={{flexShrink: 1}}>{item.name}</Text>
        </Container>
      </TouchableOpacity>
    );
  };
  return (
    <Container style={(styles.container, {backgroundColor: colors.card})}>
      <Text selectable isHeadingTitle isItalic hasMargin isCenter>
        InifinityBits Task
      </Text>
      <ScrollView style={styles.songsContainer}>
        <Container
          style={(styles.containerBtn, {backgroundColor: colors.card})}>
          <FlatList
            data={songs}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </Container>
      </ScrollView>
      <Container style={styles.songsContainer}>
        <TracksList />
      </Container>
    </Container>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  songsContainer: {
    height: '50%',
    width: '100%',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  containerBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatRenderItem: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
});
