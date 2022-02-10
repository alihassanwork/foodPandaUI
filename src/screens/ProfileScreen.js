import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getMovies, addFavorite, removeFavorite} from '../../redux/actions';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ProfileScreen = () => {
  const {movies, favorites} = useSelector(state => state.moviesReducer);

  const dispatch = useDispatch();
  const addToFavorites = movie => dispatch(addFavorite(movie));
  const removeFromFavorites = movie => dispatch(removeFavorite(movie));

  const handleAddFavorite = movie => {
    addToFavorites(movie);
  };

  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
  };

  const exists = movie => {
    if (favorites.filter(item => item.id === movie.id).length > 0) {
      return true;
    }

    return false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Popular Movies</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            const IMAGE_URL =
              'https://image.tmdb.org/t/p/w185' + item.poster_path;
            return (
              <View style={{marginVertical: 12}}>
                <View style={styles.movieContainer}>
                  <Image
                    source={{
                      uri: IMAGE_URL,
                    }}
                    resizeMode="cover"
                    style={styles.posterStyle}
                  />
                  <View style={{flex: 1, marginLeft: 12}}>
                    <View>
                      <Text style={styles.movieTitle}>{item.title}</Text>
                    </View>
                    <View style={styles.likeBtn}>
                      <MaterialIcons color="green" name="thumb-up" size={32} />
                      <Text style={styles.voteCountStyle}>
                        {item.vote_count}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          exists(item)
                            ? handleRemoveFavorite(item)
                            : handleAddFavorite(item)
                        }
                        activeOpacity={0.7}
                        style={styles.favoriteBtn}>
                        <MaterialIcons
                          color="orange"
                          size={32}
                          name={exists(item) ? 'favorite' : 'favorite-outline'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 44, paddingHorizontal: 20},
  textHeader: {fontSize: 22},
  flatListContainer: {flex: 1, marginTop: 12},
  favoriteBtn: {
    marginLeft: 14,
    flexDirection: 'row',
    padding: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
  likeBtn: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  movieTitle: {fontSize: 22, paddingRight: 16},
  voteCountStyle: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#64676D',
  },
  movieContainer: {flexDirection: 'row', flex: 1},
  posterStyle: {width: 100, height: 150, borderRadius: 10},
});
