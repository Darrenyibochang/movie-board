import React, { Fragment, useContext, useEffect, useState } from "react";
import { getMovieDetail, rateMovie } from "../apiServices";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import RatedInfoContext from "../context/RatedInfoContext";
import useUser from "../hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/Alert";
import { rateMovieAction } from "../actions/ratedInfoActions";

const MovieDetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const movieId = params.movieId;
  const dipatch = useDispatch();
  const { ratedData } = useSelector((state) => {
    return state.ratedData;
  });
  useEffect(() => {
    getMovieDetail(movieId).then((data) => {
      setMovie(data);
    });
  }, [params]);

  const handleRate = (rating) => {
    if (user) {
      dipatch(rateMovieAction(movieId, rating)).then(() => {
        setOpen(true);
      });
    }
  };
  return (
    <Fragment>
      <Alert openSnakeBar={open} setOpenSnakeBar={setOpen} title="success" />
      <MovieDetail
        movie={movie}
        myRate={ratedData[movieId]}
        onRate={handleRate}
      />
    </Fragment>
  );
};

export default MovieDetailsPage;
