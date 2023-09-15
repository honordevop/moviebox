import React from "react";
import { notFound } from "next/navigation";
import Logo from "public/tv.png";
import default_banner from "public/default_banner.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

async function getData(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}
// https://image.tmdb.org/t/p/w500/
const SelectedMovie = async ({ params }) => {
  const data = await getData(params.id);
  // console.log(data);

  return (
    <div className="flex max-w-[1220px] mx-auto">
      <div className="border-[#00000] border-2 rounded-r-[60px] w-[60px] md:w-max h-max">
        <div className="flex flex-col gap-8 justify-center items-center">
          <Link href="/">
            <ul className="text-[20px] w-[50px] md:w-[226px]">
              <li className="h-[86px] flex justify-center items-center gap-5 cursor-pointer pt-20">
                <Image src={Logo} alt="logo" className="" />
                <p className="font-black hidden md:block text-[30px]">Movie</p>
              </li>
            </ul>
          </Link>

          <ul className="text-[20px] w-[60px] md:w-[226px]">
            <Link href="/">
              <li className="h-[86px] justify-center md:justify-start flex items-center pl-0 md:pl-[60px] gap-3 cursor-pointer">
                <Image src="/Home.png" height={25} width={25} alt="home" />
                <p className="hidden md:block">Home</p>
              </li>
            </Link>
            <li className="h-[86px] justify-center md:justify-start pl-0 md:pl-[60px] flex items-center gap-3 border-r-4 border-red-600 bg-red-200 cursor-pointer">
              <Image
                src="/Movie Projector.png"
                height={25}
                width={25}
                alt="Movies"
              />
              <p className="font-semibold text-red-600 hidden md:block">
                Movies
              </p>
            </li>
            <li className="h-[86px] justify-center md:justify-start pl-0 md:pl-[60px] flex items-center gap-3 cursor-pointer">
              <Image
                src="/TV_Show.png"
                height={25}
                width={25}
                alt="TV Series"
              />
              <p className="hidden md:block">TV Series</p>
            </li>
            <li className="h-[86px] justify-center md:justify-start pl-0 md:pl-[60px] flex items-center gap-3 cursor-pointer">
              <Image
                src="/Calendar.png"
                height={25}
                width={25}
                alt="Upcoming Movies"
              />
              <p className="hidden md:block">Upcoming</p>
            </li>
          </ul>
          <div className="w-[170px] h-[228px] relative cursor-pointer hidden md:block">
            <Image src="/Group 8.png" alt="sideBar" fill className="contain" />
          </div>

          <ul className="text-[20px] w-[60px] md:w-[226px]">
            <li className="h-[86px] justify-center md:justify-start pl-0 md:pl-[60px] flex items-center gap-3 cursor-pointer">
              <Image
                src="/Logout.png"
                height={25}
                width={25}
                alt="Upcoming Movies"
              />
              <p className="hidden md:block">Logout</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full p-5 flex flex-col gap-6">
        <div className={`${styles.moviePosterWraper} relative rounded-2xl`}>
          <Image
            src={
              data.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                : default_banner
            }
            alt="movie image"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-5 font-bold text-[10px] md:text-[18px] ">
            <p data-testid="movie-title">{data.original_title}</p>
            <p data-testid="movie-release-date">
              {new Date(`${data.release_date}`).toUTCString()}
            </p>
            <p data-testid="movie-runtime">{data.runtime} mins</p>
          </div>
          <div className="flex gap-4 flex-wrap sm:flex-wrap md:flex-nowrap lg:flex-nowrap w-full">
            <div className="w-full md:w-3/5 text-justify text-[12px] md:text-[20px]">
              <p className="pb-4" data-testid="movie-overview">
                {data.overview}
              </p>

              <ul className="w-4/5 flex flex-col gap-3">
                <li>
                  <p>
                    Homepage:{" "}
                    <span className="text-[#BE123C]">
                      {data.homepage || "Not Available"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Production Companies:{" "}
                    {data.production_companies.map((company) => (
                      <span className="text-[#BE123C]">{`${company.name} (${company.origin_country}), `}</span>
                    ))}
                  </p>
                </li>
                <li>
                  <p>
                    Spoken Languages:{" "}
                    {data.spoken_languages.map((language) => (
                      <span className="text-[#BE123C]">{language.name}, </span>
                    ))}
                  </p>
                </li>
              </ul>
            </div>
            <div className="w-2/5">
              <Image
                width={360}
                height={55}
                src="/Group 50.png"
                className="mb-[15px]"
                alt="image"
              />
              <Image
                width={360}
                height={55}
                src="/Group 51.png"
                className="mb-[15px]"
                alt="image"
              />
              <Image width={360} height={229} src="/Group 52.png" alt="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedMovie;
