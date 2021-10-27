import { combineReducers } from "redux";
import userReducer from "./userInfoReducer";
import movieListReducer from "./movieListReducer";
import favoriteInfoReducer from "./favoriteInfoReducer";
import ratedInfoReducer from "./ratedInfoReducer";

const rootReducer = combineReducers({
  user: userReducer,
  movieList: movieListReducer,
  favData: favoriteInfoReducer,
  ratedData: ratedInfoReducer
});

export default rootReducer;
