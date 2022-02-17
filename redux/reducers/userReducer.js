import {USER_PROFILE_IMAGE} from '../actions';

const initialState = {
  user: {
    firstName: '',
    LastName: '',
    image:
      'https://gravatar.com/avatar/4bd8a7954f4978b3d04c39af4e5bd4d2?s=400&d=robohash&r=x',
  },
};
function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE_IMAGE:
      return {...state, user: {...state.user, image: action.payload}};
    default:
      return state;
  }
}
export default userReducer;
