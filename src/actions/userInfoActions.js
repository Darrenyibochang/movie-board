import { loginService } from "../apiServices";

export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";
export const LOGOUT = "LOGOUT";

export const setUserAction = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const removeUserAction = () => {
  return {
    type: REMOVE_USER
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT
  };
};

export const loginAction = (username, password) => {
  return (dispatch) => {
    return loginService(username, password).then((userData) => {
      dispatch(setUserAction(userData));
      localStorage.setItem("user", JSON.stringify(userData));
    });
  };
};
