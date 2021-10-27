import { getPersonalMovies, rateMovie } from "../apiServices";

export const SET_RATED_INFO_DATA = "SET_RATED_INFO_DATA";
export const SET_MOVIE_RATE = "SET_MOVIE_RATE";

export const LOAD_RATED_LIST_START = "LOAD_RATED_LIST_START";
export const LOAD_RATED_LIST_FINISHED = "LOAD_RATED_LIST_FINISHED";
export const LOAD_RATED_LIST_FAILED = "LOAD_RATED_LIST_FAILED";

export const setRatedInfoDataAction = (movieList) => {
  return {
    type: SET_RATED_INFO_DATA,
    payload: movieList
  };
};

const setMovieRateAction = (movieId, rate) => {
  return {
    type: SET_MOVIE_RATE,
    payload: { movieId, rate }
  };
};

export const rateMovieAction = (movieId, rate) => {
  return (dispatch, getState) => {
    const { user } = getState();
    if (user.user) {
      const { sessionId } = user.user;
      return rateMovie(movieId, rate, sessionId).then(() => {
        dispatch(setMovieRateAction(movieId, rate));
      });
    }
  };
};

const loadRatedListStartAction = () => {
  return {
    type: LOAD_RATED_LIST_START
  };
};

const loadRatedListFinshedAction = (movieList) => {
  return {
    type: LOAD_RATED_LIST_FINISHED,
    payload: movieList
  };
};

const loadRatedListFailedAction = () => {
  return {
    type: LOAD_RATED_LIST_FAILED
  };
};

export const loadRatedListAction = () => {
  return (dispatch, getState) => {
    const { user } = getState();
    if (user.user) {
      const { sessionId, accountId } = user.user;
      dispatch(loadRatedListStartAction());
      return getPersonalMovies(accountId, "rated", sessionId)
        .then((data) => {
          dispatch(setRatedInfoDataAction(data.results));
          dispatch(loadRatedListFinshedAction(data.results));
        })
        .catch(() => {
          dispatch(loadRatedListFailedAction());
        });
    }
  };
};
