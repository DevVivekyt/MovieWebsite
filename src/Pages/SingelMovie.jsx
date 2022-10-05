import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Loading, movie } from "../Context/Contex";
import "../App.css";

const SingelMovie = () => {
  const { id } = useParams();
  //States
  const [Loading, setLoading] = useState(true);
  const [movie, setMovie] = useState("");
  const [isError, setIsError] = useState({ show: "false", msg: "" });

  //   Api Url with veriables
  const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`;

  //   Fetch movie data from url
  const getMovie = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log("movie", data);
      if (data.Response === "True") {
        setLoading(false);
        setMovie(data);
      } else {
        setIsError({ show: "true", msg: data.error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Call movie data function;
  useEffect(() => {
    let Debouncing = setTimeout(() => {
      getMovie();
    }, 1000);
    return () => clearTimeout(Debouncing);
  }, [id]);

  if (Loading) {
    return (
      <div className="movie-section">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <section className="movie-section">
        <div className="movie-card">
          <figure>
            <img src={movie.Poster} alt="" />
          </figure>
          <div className="card-content">
            <p className="title">{movie.Title}</p>
            <p></p>
            <p className="cart-text">Actors:&nbsp;&nbsp;{movie.Actors}</p>
            <p className="cart-text">Released:&nbsp;&nbsp;{movie.Released}</p>
            <p className="cart-text">Genre:&nbsp;&nbsp;{movie.Genre}</p>
            <p className="cart-text">
              imdbRating:&nbsp;&nbsp;{movie.imdbRating}
            </p>
            <p className="cart-text">Country:&nbsp;&nbsp;{movie.Country}</p>
            <p className="cart-text">BoxOffice:&nbsp;&nbsp;{movie.BoxOffice}</p>
            <NavLink to="/" className="back-btn">
              Go Home
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingelMovie;
