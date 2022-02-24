import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Container} from '../../components/elements';
import TracksList from './TrackList/TrackList';
const MusicPlayer = () => {
  return (
    <Container style={styles.container}>
      <Text>MusicPlayer</Text>
      <TracksList />
    </Container>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
