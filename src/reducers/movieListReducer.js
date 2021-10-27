import * as Actions from "../actions/movieListActions";
import { CATEGORIES } from "../constant";

const initialState = {
  movieData: {},
  loading: false,
  currentPage: 1,
  category: CATEGORIES.POPULAR,
  totalPages: 999
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_CATEGORY: {
      return {
        ...state,
        category: action.payload
      };
    }
    case Actions.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload
      };
    }
    case Actions.SET_TOTAL_PAGES: {
      return {
        ...state,
        totalPages: action.payload
      };
    }
    case Actions.LOAD_MOVIE_LIST_START: {
      return {
        ...state,
        loading: true
      };
    }
    case Actions.LOAD_MOVIE_LIST_FAILED: {
      return {
        ...state,
        loading: false
      };
    }
    case Actions.LOAD_MOVIE_LIST_FINISHED: {
      const { results, category, page } = action.payload;
      const movieData = state.movieData;
      return {
        ...state,
        loading: false,
        movieData: {
          ...movieData,
          [category]: movieData[category]
            ? {
                ...movieData[category],
                [page]: results
              }
            : {
                [page]: results
              }
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
