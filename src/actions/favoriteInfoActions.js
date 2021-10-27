import { getPersonalMovies, toggleFavoriteMovie } from "../apiServices";

export const SET_FAV_INFO_DATA = "SET_FAV_INFO_DATA";
export const SET_IS_FAVORITE_MOVIE = "SET_IS_FAVORITE_MOVIE";

export const LOAD_FAV_LIST_START = "LOAD_FAV_LIST_START";
export const LOAD_FAV_LIST_FINISHED = "LOAD_FAV_LIST_FINISHED";
export const LOAD_FAV_LIST_FAILED = "LOAD_FAV_LIST_FAILED";

export const setFavInfoDataAction = (movieList) => {
  return {
    type: SET_FAV_INFO_DATA,
    payload: movieList
  };
};

const setIsFavoriteMovieAction = (movieId, isFavorite) => {
  return {
    type: SET_IS_FAVORITE_MOVIE,
    payload: { movieId, isFavorite }
  };
};

export const toggleFavoriteAction = (movieId, isFavorite) => {
  return (dispatch, getState) => {
    const { user } = getState();
    if (user.user) {
      const { sessionId, accountId } = user.user;
      return toggleFavoriteMovie(
        movieId,
        isFavorite,
        accountId,
        sessionId
      ).then(() => {
        dispatch(setIsFavoriteMovieAction(movieId, isFavorite));
      });
    }
  };
};

const loadFavListStartAction = () => {
  return {
    type: LOAD_FAV_LIST_START
  };
};

const loadFavListFinshedAction = (movieList) => {
  return {
    type: LOAD_FAV_LIST_FINISHED,
    payload: movieList
  };
};

const loadFavListFailedAction = () => {
  return {
    type: LOAD_FAV_LIST_FAILED
  };
};

export const loadFavListAction = () => {
  return (dispatch, getState) => {
    const { user } = getState();
    if (user.user) {
      const { sessionId, accountId } = user.user;
      dispatch(loadFavListStartAction());
      return getPersonalMovies(accountId, "favorite", sessionId)
        .then((data) => {
          dispatch(setFavInfoDataAction(data.results));
          dispatch(loadFavListFinshedAction(data.results));
        })
        .catch(() => {
          dispatch(loadFavListFailedAction());
        });
    }
  };
};
