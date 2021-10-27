import { Box, CircularProgress } from "@material-ui/core";
import React, { Fragment, useEffect, useMemo } from "react";
import CategorySelect from "../components/CategorySelect";
import Pagination from "../components/Pagination";
import { CATEGORIES } from "../constant";
import MovieListBase from "./MovieListBase";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMovieDataAction,
  setCategoryAction,
  setCurrentPageAction
} from "../actions/movieListActions";

const MovieList = () => {
  const dispatch = useDispatch();
  const { loading, category, currentPage, totalPages, movieData } = useSelector(
    (state) => {
      return state.movieList;
    }
  );
  const loadMovie = (category, page) => {
    if (movieData[category] && movieData[category][page]) {
      dispatch(setCurrentPageAction(page));
    } else {
      dispatch(loadMovieDataAction(category, page));
    }
  };

  useEffect(() => {
    loadMovie(CATEGORIES.POPULAR, 1);
  }, []);

  useEffect(() => {
    loadMovie(category, 1);
  }, [category]);

  const handlePageChange = (page) => {
    loadMovie(category, page);
  };

  const setCatgory = (category) => {
    dispatch(setCategoryAction(category));
  };

  const movieList = useMemo(() => {
    if (movieData[category] && movieData[category][currentPage]) {
      return movieData[category][currentPage];
    } else {
      return [];
    }
  }, [movieData, category, currentPage]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <Box display={"flex"} justifyContent="space-between">
            <div></div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handlePageChange}
              onPrev={handlePageChange}
            />
            <CategorySelect category={category} setCategory={setCatgory} />
          </Box>

          <MovieListBase movieList={movieList} />
        </Fragment>
      )}
    </div>
  );
};

export default MovieList;
