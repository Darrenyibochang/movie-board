import { CircularProgress } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { getPersonalMovies } from "../apiServices";
import FavoriteInfoContext from "../context/FavoriteInfoContext";
import RatedInfoContext from "../context/RatedInfoContext";
import useUser from "../hooks/useUser";
import { useDispatch } from "react-redux";
import { setUserAction } from "../actions/userInfoActions";
import { loadFavListAction } from "../actions/favoriteInfoActions";
import { loadRatedListAction } from "../actions/ratedInfoActions";

const UserInfoLoader = ({ children }) => {
  const { user } = useUser();
  const { setFavData } = useContext(FavoriteInfoContext);
  const { setRatedData } = useContext(RatedInfoContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const userInStorage = localStorage.getItem("user");
    if (userInStorage) {
      try {
        const userInfo = JSON.parse(userInStorage);
        if (userInfo) {
          dispatch(setUserAction(userInfo));
        }
      } catch (e) {
        console.error("Failed to parse user info");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([
        dispatch(loadFavListAction()),
        dispatch(loadRatedListAction())
      ]).then(() => {
        setLoading(false);
      });
    }
  }, [user]);

  return loading ? <CircularProgress /> : children;
};

export default UserInfoLoader;
