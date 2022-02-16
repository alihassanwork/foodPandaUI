import {USER_PROFILE_IMAGE} from '../actions';

const initialState = {
  user: {
    firstName: '',
    LastName: '',
    image: '',
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
