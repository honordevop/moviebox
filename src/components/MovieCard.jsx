"use client";
import React, { useState } from "react";
import styles from "./moviecard.module.css";
import Image from "next/image";
import { useGlobalContext } from "@/context/context";
import imdbImage from "public/imdb.png";
import ratingIcon from "public/tomato.png";
import Heart from "public/Heart.png";
import default_poster from "public/default_poster.JPG";
import Loading from "./Loading";
import Link from "next/link";

const MovieCard = () => {
  const { movies, loading, favourites, addToFavourites, error } =
    useGlobalContext();

  // const [markFavourite, setMarkFavourite] = useState(false);

  // const favouriteClickHandler = (id) => {
  //   // setMarkFavourite((current) => !current);
  //   console.log(id);
  //   if (favourites.includes(id)) {
  //     console.log(favourites.indexOf(id));
  //     favourites.splice(favourites.indexOf(id), 1);
  //     setFavourites([...favourites]);
  //     localStorage.setItem("favourites", JSON.stringify(favourites));
  //     return;
  //     // return favourites;
  //   }
  //   setFavourites([...favourites, id]);
  // };
  // localStorage.setItem("favourites", JSON.stringify(favourites));
  // console.log(favourites);

  const movieNotFound = (
    <div className="flex items-center pt-[40px] justify-center text-black text-[20px]">
      <h1>😢Sorry, no match was found</h1>
    </div>
  );
  const cssClass = `w-[30px] h-[30px] rounded-[15px] bg-[#F3F4F680] absolute top-5 right-5 flex items-center justify-center cursor-pointer`;
  // if (markFavourite) {
  //   let
  // } else {
  //   const cssClass = `w-[30px] h-[30px] rounded-[15px] bg-[#F3F4F680] absolute top-5 right-5 flex items-center justify-center cursor-pointer`;
  // }

  if (loading) {
    return (
      <section className="section">
        <Loading />
      </section>
    );
  }

  if (!movies.length) {
    return movieNotFound;
  }

  return (
    <div
      className={`max-w-[1220px] mx-auto flex flex-col ${styles.movieCardContainer}`}
    >
      <h1 className="my-[30px] text-3xl font-extrabold">Top Rated Movies</h1>
      {error ? (
        <div className="flex items-center justify-center text-black text-[20px]">
          <h1>😢Opps.... movies can't be fetch due to error from the server</h1>
        </div>
      ) : (
        <section
          className={`${styles.cardSection} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4`}
        >
          {movies.map((movie) => {
            const { id, title, poster_path, vote_average, release_date } =
              movie;

            const poster = `https://image.tmdb.org/t/p/w185${poster_path}`;
            return (
              <div
                className={`${styles.card} relative`}
                data-testid="movie-card"
                key={id}
              >
                <div className="mx-auto flex gap-3 flex-col items-center justify-center">
                  <div className={`relative h-[300px] w-full`}>
                    <Link href={`/movies/${id}`}>
                      <Image
                        src={poster_path ? `${poster}` : default_poster}
                        className={`${styles.poster} 
                  object-fit rounded-[15px]`}
                        data-testid="movie-poster"
                        alt={`${title}`}
                        // width={250}
                        fill
                        // height={500}
                        // fill={true}
                      />
                    </Link>
                    <div
                      className={
                        favourites.includes(id)
                          ? `${cssClass} ${styles.favourite}`
                          : cssClass
                      }
                      onClick={() => addToFavourites(id)}
                    >
                      <Image className="" src={Heart} alt="favourite icon" />
                    </div>
                  </div>
                  <div
                    className={`${styles.subText} w-full flex flex-col gap-1`}
                  >
                    <p
                      data-testid="movie-title"
                      className={`font-bold text-2xl`}
                    >
                      {title}
                    </p>
                    <p
                      data-testid="movie-release-date"
                      className={styles.releaseDate}
                    >
                      {new Date(`${release_date}`).toUTCString()}
                    </p>
                  </div>
                  <div className="flex mb-3 px-[5px] gap-[20px] justify-between w-full">
                    <div className="flex gap-[10px] justify-center items-center">
                      <Image src={imdbImage} alt="imdb icon" />
                      <p>{vote_average}/10</p>
                    </div>
                    <div className="flex gap-[10px] justify-center items-center">
                      <Image src={ratingIcon} alt="rating" />
                      <p>97%</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default MovieCard;
