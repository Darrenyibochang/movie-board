import { getMovieList } from "../apiServices";

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
export const SET_CATEGORY = "SET_CATEGORY";

export const LOAD_MOVIE_LIST_START = "LOAD_MOVIE_LIST_START";
export const LOAD_MOVIE_LIST_FINISHED = "LOAD_MOVIE_LIST_FINISHED";
export const LOAD_MOVIE_LIST_FAILED = "LOAD_MOVIE_LIST_FAILED";

export const setCurrentPageAction = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page
  };
};

export const setTotalPagesAction = (pages) => {
  return {
    type: SET_TOTAL_PAGES,
    payload: pages
  };
};

export const setCategoryAction = (category) => {
  return {
    type: SET_CATEGORY,
    payload: category
  };
};

const loadMovieStartAction = () => {
  return {
    type: LOAD_MOVIE_LIST_START
  };
};

const loadMovieFinishedAction = (results, category, page) => {
  return {
    type: LOAD_MOVIE_LIST_FINISHED,
    payload: {
      results,
      category,
      page
    }
  };
};

const loadMovieFailedAction = () => {
  return {
    type: LOAD_MOVIE_LIST_FAILED
  };
};

export const loadMovieDataAction = (category, page) => {
  return (dispatch) => {
    dispatch(loadMovieStartAction());
    return getMovieList(category, page)
      .then((data) => {
        const { page, results, total_pages } = data;
        dispatch(loadMovieFinishedAction(results, category, page));
        dispatch(setCurrentPageAction(page));
        dispatch(setTotalPagesAction(total_pages));
      })
      .catch((e) => {
        dispatch(loadMovieFailedAction());
      });
  };
};
