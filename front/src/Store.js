import { createStore } from "redux";

const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === "LOGIN_SUCCESS") {
    return {
    ...state,
      user: action.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
    ...state,
      user: null,
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
