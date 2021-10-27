import { CircularProgress, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getPersonalMovies } from "../apiServices";
import useUser from "../hooks/useUser";
import MovieListBase from "./MovieListBase";
import { useDispatch, useSelector } from "react-redux";
import { loadRatedListAction } from "../actions/ratedInfoActions";

const RatedList = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { loading, ratedList } = useSelector((state) => {
    return state.ratedData;
  });
  useEffect(() => {
    if (user) {
      dispatch(loadRatedListAction());
    }
  }, []);
  return (
    <div>
      <Typography>Rated</Typography>
      {loading ? <CircularProgress /> : <MovieListBase movieList={ratedList} />}
    </div>
  );
};

export default RatedList;
