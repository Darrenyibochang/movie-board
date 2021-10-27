import * as Actions from "../actions/favoriteInfoActions";

const initialState = {
  favData: {},
  favList: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_IS_FAVORITE_MOVIE: {
      const { movieId, isFavorite } = action.payload;
      return {
        ...state,
        favData: {
          ...state.favData,
          [movieId]: isFavorite
        }
      };
    }
    case Actions.SET_FAV_INFO_DATA: {
      const movieList = action.payload;
      const favData = movieList.reduce((acc, movie) => {
        return {
          ...acc,
          [movie.id]: movie
        };
      }, {});
      return {
        ...state,
        favData
      };
    }
    case Actions.LOAD_FAV_LIST_START: {
      return {
        ...state,
        loading: true
      };
    }
    case Actions.LOAD_FAV_LIST_FAILED: {
      return {
        ...state,
        loading: false
      };
    }
    case Actions.LOAD_FAV_LIST_FINISHED: {
      return {
        ...state,
        loading: false,
        favList: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
