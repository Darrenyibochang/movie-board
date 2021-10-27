import React, { useContext, useMemo } from "react";
import { toggleFavoriteMovie } from "../apiServices";
import MovieCard from "../components/MovieCard";
import MovieGrid from "../components/MovieGrid";
import FavoriteInfoContext from "../context/FavoriteInfoContext";
import useUser from "../hooks/useUser";
import { getImgUrl } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteAction } from "../actions/favoriteInfoActions";

const MovieListBase = ({ movieList }) => {
  // const { favData, setFavData } = useContext(FavoriteInfoContext);
  const dispatch = useDispatch();
  const favData = useSelector((state) => {
    return state.favData.favData;
  });
  const { ratedData } = useSelector((state) => {
    return state.ratedData;
  });

  // const { user } = useUser();
  const handleToggleFavorite = (id) => {
    dispatch(toggleFavoriteAction(id, !favData[id]));
  };
  return (
    <MovieGrid>
      {movieList.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            id={movie.id}
            imgSrc={getImgUrl(movie.poster_path)}
            title={movie.title}
            rating={movie.vote_average}
            myRating={ratedData[movie.id]}
            favorite={favData[movie.id]}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      })}
    </MovieGrid>
  );
};

export default MovieListBase;
