import { CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import MovieListBase from "./MovieListBase";
import { useDispatch, useSelector } from "react-redux";
import { loadFavListAction } from "../actions/favoriteInfoActions";

const FavoriteList = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { favList, loading } = useSelector((state) => {
    return state.favData;
  });

  useEffect(() => {
    if (user) {
      dispatch(loadFavListAction());
    }
  }, []);

  return (
    <div>
      <Typography>Favorite</Typography>
      {loading ? <CircularProgress /> : <MovieListBase movieList={favList} />}
    </div>
  );
};

export default FavoriteList;
