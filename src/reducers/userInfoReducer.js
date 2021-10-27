import * as Actions from "../actions/userInfoActions";

const intialState = {
  user: undefined
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case Actions.SET_USER: {
      return {
        user: action.payload
      };
    }
    case Actions.LOGOUT: {
      return {
        user: undefined
      };
    }
    default:
      return state;
  }
};

export default reducer;
