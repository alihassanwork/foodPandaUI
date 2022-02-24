import {USER_PROFILE_IMAGE, USER_DATA} from '../actions';

const initialState = {
  user: {
    name: '',
    email: '',
    avatar:
      'https://gravatar.com/avatar/4bd8a7954f4978b3d04c39af4e5bd4d2?s=400&d=robohash&r=x',
  },
};
function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE_IMAGE:
      return {...state, user: {...state.user, avatar: action.payload}};
    case USER_DATA:
      return {...state, user: action.payload};
    default:
      return state;
  }
}
export default userReducer;
