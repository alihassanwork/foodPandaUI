import {
  StyleSheet,
  ImageBackground,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  Text,
  LogBox,
  FlatList,
} from 'react-native';

import React, {useEffect} from 'react';
import {SearchComponent} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import {data} from '../../../data';
import {useSelector, useDispatch} from 'react-redux';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
import {MovieCard} from '../../components';
import {getMovies} from '../../../redux/actions';
const HomeScreen = ({navigation}) => {
  const {movies} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();
  const fetchMovies = () => dispatch(getMovies());
  useEffect(() => {
    fetchMovies();
  }, []);
  // render Itme Daily deals
  const renderItem = ({index, item}) => {
    return (
      <View style={styles.dealsContainer}>
        <ImageBackground
          source={item.img}
          style={styles.dealsImage}
          resizeMode="cover"></ImageBackground>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden={false} barStyle="light-content" />
      <SearchComponent />
      <ImageBackground
        style={styles.greetingContainer}
        source={require('../../../assets/images/greetingbg.png')}
        resizeMode="cover">
        <Text style={styles.h1}>Good evening,</Text>
        <View style={{width: '60%'}}>
          <Text style={styles.h3}>
            What's for dinner? There are 32 restaurant in your area
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.containerWrapper}>
        <ImageBackground
          style={styles.devliveryContainer}
          source={require('../../../assets/images/delivery.png')}
          resizeMode="contain">
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.3)']}
            style={styles.gradientContainer}>
            <Text style={[styles.h1, {color: 'white'}]}>Food delivery</Text>
            <Text style={[styles.h3, {color: 'white'}]}>
              Order from your favorite restaurants and home chefs
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View
        style={[
          styles.containerWrapper,
          {flexDirection: 'row', justifyContent: 'space-between'},
        ]}>
        <View style={styles.martContainer}>
          <ImageBackground
            source={require('../../../assets/images/delivery.png')}
            resizeMode="contain"
            style={styles.containerbg}>
            <Text style={[styles.h1, {color: 'black'}]}>Food delivery</Text>
            <Text style={[styles.h3, {color: 'black'}]}>
              Enjoy FLAT 25% off {'\n'}and more...
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.shopAndPickWrapper}>
          <View style={styles.pickupContainer}>
            <ImageBackground
              source={require('../../../assets/images/delivery.png')}
              resizeMode="contain"
              style={styles.containerbg}>
              <LinearGradient
                colors={['transparent', 'rgba(255,255,255,0.3)']}
                style={styles.gradientContainer}>
                <Text style={[styles.h1, {color: '#333'}]}>Pick-Up</Text>
                <Text style={[styles.h3, {color: '#333'}]}>
                  Enjoy FLAT 25% {'\n'} off and more...
                </Text>
              </LinearGradient>
            </ImageBackground>
          </View>
          <View style={styles.shopContainer}>
            <ImageBackground
              source={require('../../../assets/images/delivery.png')}
              resizeMode="contain"
              style={styles.containerbg}>
              <LinearGradient
                colors={['transparent', 'rgba(255,255,255,0.3)']}
                style={styles.gradientContainer}>
                <Text style={[styles.h1, {color: '#333'}]}>Shops</Text>
                <Text style={[styles.h3, {color: '#333'}]}>
                  Grocery & more..
                </Text>
              </LinearGradient>
            </ImageBackground>
          </View>
        </View>
      </View>
      <Text style={[styles.h1, {paddingLeft: 10}]}>CINEPAX</Text>
      <View style={{paddingHorizontal: 10}}>
        <FlatList
          horizontal
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <MovieCard item={item} navigation={navigation} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text style={[styles.h1, {paddingLeft: 10, marginVertical: 5}]}>
        YOUR DAILY DEALS
      </Text>
      <View style={styles.footerContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          decelerationRate={'normal'}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  greetingContainer: {
    height: height * 0.15,
    justifyContent: 'center',
    paddingLeft: 50,
  },
  h1: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
    fontFamily: 'Muli',
  },
  h3: {
    fontSize: 14,
    fontWeight: '300',
    color: '#333',
    fontFamily: 'Muli',
  },
  devliveryContainer: {
    width: '95%',
    height: height * 0.2,
    backgroundColor: '#D60E64',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  containerWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  gradientContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
    borderRadius: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  pickupContainer: {
    width: '46%',
    height: height * 0.17,
    backgroundColor: '#FD6F93',
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  containerbg: {width: '100%', height: '100%', justifyContent: 'flex-end'},
  dealsWrapper: {
    width: '95%',
    backgroundColor: 'red',
  },
  dealsContainer: {
    height: height * 0.175,
    width: width * 0.3,
    borderRadius: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    marginHorizontal: 3,
    elevation: 5,
    overflow: 'hidden',
  },
  dealsImage: {
    width: '100%',
    height: '100%',
  },
  dealsText: {color: '#333', marginBottom: 5, paddingLeft: 10},
  footerContainer: {
    flex: 1,
    paddingBottom: 30,
    marginLeft: 5,
    marginTop: 5,
  },
  martContainer: {
    height: height * 0.25,
    width: width * 0.45,
    backgroundColor: '#FED271',
    justifyContent: 'flex-end',
    borderRadius: 10,
    marginLeft: 10,
    paddingLeft: 10,
    paddingBottom: 15,
  },
  shopAndPickWrapper: {
    height: height * 0.25,
    width: width * 0.45,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  pickupContainer: {
    flexDirection: 'column',
    width: '100%',
    height: height * 0.15,
    backgroundColor: '#EF9FC2',
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  shopContainer: {
    flexDirection: 'column',
    width: '100%',
    height: height * 0.09,
    backgroundColor: '#85BFFF',
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
});
