"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [error, setError] = useState(false);

  const [selectedMeal, setSelectedMeal] = useState("");

  // console.log(process.env.REACT_APP_TMDB_API_KEY);

  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`;

  const rated = "https://api.themoviedb.org/3/movie/top_rated";

  const fetchMovies = async (url) => {
    setError(false);
    setLoading(true);

    try {
      const data = await axios(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
        },
      });

      // const response = await res.json();
      setMovies(data.data.results.slice(0, 10));
      // console.log(data.data.results.slice(0, 10));
    } catch (e) {
      setError(true);
      console.log(e.error);
    }
    setLoading(false);
  };

  const getFavouritesFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      let favourites = window.localStorage.getItem("favourites");
      if (favourites) {
        favourites = JSON.parse(window.localStorage.getItem("favourites"));
      } else {
        favourites = [];
      }
      return favourites;
    }
  };

  const [favourites, setFavourites] = useState(getFavouritesFromLocalStorage());

  //Function for favorite Movie
  const addToFavourites = (id) => {
    const alreadyFavourite = favourites.includes(id);
    if (alreadyFavourite) {
      const updatedFavourites = favourites.filter(
        (favourite) => favourite !== id
      );
      setFavourites(updatedFavourites);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }
    if (!alreadyFavourite) {
      const updatedFavourites = [...favourites, id];
      setFavourites(updatedFavourites);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      // return updatedFavourites;
    }
  };

  const getSearchTerm = async (text) => {
    setSearchTerm(text);
  };

  useEffect(() => {
    fetchMovies(rated);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;

    // Set the Url to be dynamic based on searchTerm
    fetchMovies(searchUrl);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        loading,
        movies,
        getSearchTerm,
        addToFavourites,
        favourites,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

export const useGlobalContext = () => {
  return useContext(AppContext);
};
