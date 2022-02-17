import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-controls';
const VideoPlayerScreen = ({navigation}) => {
  const {colors} = useTheme();
  const textColor = colors.text;
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.heading, {color: textColor}]}>VideoPlayerCard</Text>
      <VideoPlayer
        seekColor={colors.primary}
        onBack={() => navigation.navigate('ImageUploadScreen')}
        controlAnimationTiming={750}
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        }} // Can be a URL or a local file.
        style={{flex: 1}}
      />
    </View>
  );
};

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    alignSelf: 'center',
    paddingVertical: 10,
  },
});
