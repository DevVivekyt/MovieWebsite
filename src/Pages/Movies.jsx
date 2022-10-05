import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../Context/Contex";
import "../App.css";

const Movies = () => {
  const { movie, Loading } = useGlobalContext();

  if (Loading) {
    return (
      <div className="">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="container grid grid-4-col">
          {movie.map((curMovie, index) => {
            const movieName = curMovie.Title.substring(0, 15);
            return (
              <NavLink to={`movie/${curMovie.imdbID}`} key={index}>
                <div className="card">
                  <div className="card-info">
                    <h2>
                      {movieName.length >= 15 ? `${movieName}...` : movieName}
                    </h2>
                    <img src={curMovie.Poster} alt="" />
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Movies;
