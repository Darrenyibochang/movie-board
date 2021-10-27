import * as Actions from "../actions/ratedInfoActions";

const initialState = {
  ratedData: {},
  ratedList: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_MOVIE_RATE: {
      const { movieId, rate } = action.payload;
      return {
        ...state,
        ratedData: {
          ...state.ratedData,
          [movieId]: rate
        }
      };
    }
    case Actions.SET_RATED_INFO_DATA: {
      const movieList = action.payload;
      const ratedData = movieList.reduce((acc, movie) => {
        return {
          ...acc,
          [movie.id]: movie.rating
        };
      }, {});
      return {
        ...state,
        ratedData
      };
    }
    case Actions.LOAD_RATED_LIST_START: {
      return {
        ...state,
        loading: true
      };
    }
    case Actions.LOAD_RATED_LIST_FAILED: {
      return {
        ...state,
        loading: false
      };
    }
    case Actions.LOAD_RATED_LIST_FINISHED: {
      return {
        ...state,
        loading: false,
        ratedList: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
