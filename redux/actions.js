import axios from 'axios';
import hotels from '../src/api/hotels';
// Define action types
export const GET_MOVIES = 'FETCH_MOVIES';
export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const REMOVE_FAVORITE_ITEM = 'REMOVE_FAVORITE_ITEM';
export const USER_PROFILE_IMAGE = 'USER_PROFILE_IMAGE';
export const USER_DATA = 'USER_DATA';
export const HOTELS = 'HOTELS';

// Construct a BASE URL for API endpoint
const API_URL = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = 'bb925e230868e5ea561be5d9be231edb';
const PARAMS = 'page=1';
const BASE_URL = `${API_URL}?api_key=${API_KEY}&${PARAMS}`;
// fetch movies return dispatch function
export const getMovies = () => {
  try {
    return async dispatch => {
      const res = await axios.get(`${BASE_URL}`);

      if (res.data) {
        dispatch({
          type: GET_MOVIES,
          payload: res.data.results,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    // Add custom logic to handle errors
  }
};

// add favourite movie
export const addFavorite = movie => dispatch => {
  dispatch({
    type: ADD_FAVORITE_ITEM,
    payload: movie,
  });
};

// remove favorite movie
export const removeFavorite = movie => dispatch => {
  dispatch({
    type: REMOVE_FAVORITE_ITEM,
    payload: movie,
  });
};

//USER profile
export const setUserProfile = image => dispatch => {
  dispatch({
    type: USER_PROFILE_IMAGE,
    payload: image,
  });
};
export const setUserData = userInfo => dispatch => {
  dispatch({
    type: USER_DATA,
    payload: userInfo,
  });
};

export const getHotels = () => {
  try {
    return async dispatch => {
      const res = await hotels.get('/search', {
        params: {
          term: 'pasta',
          limit: 10,
          location: 'san jose', //change to another city
        },
      });
      if (res.data) {
        dispatch({
          type: HOTELS,
          payload: res.data.businesses,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    console.log(error);
  }
};
