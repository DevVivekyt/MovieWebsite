import React, { useContext, useEffect, useState } from "react";
 

// Create Context
const AppContext = React.createContext();

//  Provider function
const AppProvider = ({ children }) => {
  //States
  const [Loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("iron");

  //   Api Url with veriables
  const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`;

  //   Fetch movie data from url
  const getMovie = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log("movie", data);
      if (data.Response === "True") {
        setIsError({ show: "false", msg: data.Error });
        setLoading(false);
        setMovie(data.Search);
      } else {
        setIsError({ show: "true", msg: data.Error });
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
  }, [query]);

  //   Manage State with context Api
  return (
    <AppContext.Provider value={{ Loading, movie, isError, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

// Create global context;
const useGlobalContext = () => {
  return useContext(AppContext);
};

// Export Context veriables
export { AppProvider, useGlobalContext };
