import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {FavouriteCard} from '../components';

const Favourites = () => {
  const {favorites} = useSelector(state => state.moviesReducer);

  return (
    <View style={Styles.container}>
      <Text style={Styles.favouritesText}>Favorites</Text>
      <View style={Styles.movieContainer}>
        {favorites.length === 0 ? (
          <Text style={Styles.heading}>Add a movie to the list.</Text>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <FavouriteCard item={item} />}
          />
        )}
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20},
  favouritesText: {fontSize: 22},
  movieContainer: {flex: 1, marginTop: 8},
  heading: {color: '#010101', fontSize: 18},
});
export default Favourites;
