import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

import TrackPlayer, {
  Capability,
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tracks from '../../../utils/tracks';
import {COLORS} from '../../../../constants/theme';
const {width, height} = Dimensions.get('window');
import {useSelector, useDispatch} from 'react-redux';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker';
import {setTracks} from '../../../../redux/actions';

import {Container, Text} from '../../../components/elements';

// react-native-track-player setUp player
const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });
    await TrackPlayer.add(tracks);
  } catch (error) {
    console.log(error);
  }
};
// play pause button method
const togglePlayBack = async playBackState => {
  console.log('playBackState==>', playBackState);
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log('currentTrack==>', currentTrack);
  console.log('State.Playing==>', State.Playing);
  if (currentTrack != null) {
    if (playBackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const MusicPlayer = () => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  //redux
  const dispatch = useDispatch();
  const {songs} = useSelector(state => state.userReducer);
  const handleSetTracks = value => dispatch(setTracks(value));
  //   custom states
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  // custom referecnces
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  //   changing the track on complete
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artwork, artist} = track;
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  const skipTo = async trackId => {
    console.log('track id===>', trackId);
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    setupPlayer();

    scrollX.addListener(({value}) => {
      //   console.log(`ScrollX : ${value} | Device Width : ${width} `);

      const index = Math.round(value / width);
      skipTo(index);
      setsongIndex(index);

      //   console.log(`Index : ${index}`);
    });

    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();
      setsongIndex(0);
    };
  }, []);

  // handle file picker error
  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };
  const skipToNext = () => {
    console.log('skip to next before index==>', songIndex);
    setsongIndex(songIndex < tracks.length - 1 ? songIndex + 1 : 0);
    songSlider.current.scrollToOffset({
      offset:
        (songIndex < tracks.length - 1 ? songIndex + 1 : songIndex + 0) * width,
    });
  };

  const skipToPrevious = () => {
    console.log('skip to previous index==>', songIndex);
    songSlider.current.scrollToOffset({
      offset: (songIndex > 0 ? songIndex - 1 : songIndex + 0) * width,
    });
    setsongIndex(songIndex > 0 ? songIndex - 1 : 0);
  };
  console.log(
    'progress.progress===>',
    Math.round((progress.buffered / progress.duration) * 100),
  );
  const bufferedPercentage = Math.round(
    (progress.buffered / progress.duration) * 100,
  );

  // pick files audio
  console.log('redux songs state===> ', songs);
  const renderSongs = ({item, index}) => {
    return (
      <Animated.View style={style.mainWrapper}>
        <View
          style={[
            style.imageWrapper,
            style.elevation,
            {transform: [{rotate: `${progress.position * 5}deg`}]},
          ]}>
          <Image
            //   source={item.artwork}
            source={{uri: trackArtwork}}
            style={style.musicImage}
          />
        </View>
      </Animated.View>
    );
  };
  return (
    <SafeAreaView style={style.container}>
      {/* music player section */}
      <Container style={style.folderContainer}>
        <TouchableOpacity
          style={style.folderContainerItem}
          onPress={() => {
            DocumentPicker.pick({
              allowMultiSelection: true,
              type: [types.audio],
            })
              .then(pick => handleSetTracks(pick))
              .catch(handleError);
          }}>
          <Ionicons name="ios-musical-notes-sharp" size={35} color="blue" />
        </TouchableOpacity>
      </Container>

      <View style={style.mainContainer}>
        {/* Image */}
        <Animated.FlatList
          ref={songSlider}
          renderItem={renderSongs}
          data={tracks}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />

        {/* Title & Artist Name */}
        <View>
          <Text style={[style.songContent, style.songTitle]}>
            {/* {songs[songIndex].title} */ trackTitle}
          </Text>
          <Text style={[style.songContent, style.songArtist]}>
            {/* {songs[songIndex].artist} */ trackArtist}
          </Text>
        </View>

        {/* songslider */}
        <View>
          <Slider
            style={style.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor={COLORS.primary}
            minimumTrackTintColor={COLORS.primary}
            maximumTrackTintColor="#fff"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#FFFF',
              justifyContent: 'center',
              alignItems: 'center',
              width: isNaN(bufferedPercentage)
                ? 0
                : (bufferedPercentage / 100) * 325,
              height: 1,
              top: 44,
              left: 16,
              borderRadius: 10,
            }}></View>

          {/* Progress Durations */}
          <View style={style.progressLevelDuraiton}>
            <Text style={style.progressLabelText}>
              {new Date(progress.position * 1000)
                .toLocaleTimeString()
                .replace('AM', '')
                .substring(3)}
            </Text>
            <Text style={style.progressLabelText}>
              {new Date((progress.duration - progress.position) * 1000)
                .toLocaleTimeString()
                .replace('AM', '')
                .substring(3)}
            </Text>
          </View>
        </View>

        {/* music control */}
        <View style={style.musicControlsContainer}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={75}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    borderTopLeftRadius: 25,

    borderTopRightRadius: 25,
  },
  folderContainer: {
    width: '100%',
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    backgroundColor: '#222831',
  },
  folderContainerItem: {
    width: 70,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  musicImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  elevation: {
    elevation: 5,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
    zIndex: 10,
  },
  progressLevelDuraiton: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
    marginBottom: 30,
  },
});
