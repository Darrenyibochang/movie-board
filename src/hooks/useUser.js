import { useContext } from "react";
import UserContext from "../context/UserContext";
import { loginService } from "../apiServices";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  logoutAction,
  setUserAction
} from "../actions/userInfoActions";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.user;
  });
  // const { user, setUser } = useContext(UserContext);

  const login = (username, password) => {
    return dispatch(loginAction(username, password));
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("user");
  };

  return {
    user,
    login,
    logout
  };
};

export default useUser;
