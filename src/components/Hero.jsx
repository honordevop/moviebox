import React from "react";
import styles from "./hero.module.css";
import Image from "next/image";
import imdbImage from "public/imdb.png";
import Play from "public/Play.png";
import ratingIcon from "public/tomato.png";

const Hero = () => {
  return (
    <div
      className={`${styles.heroWrapper}  w-[1220px] text-white relative z-1 flex flex-col gap-4`}
    >
      <div className="font-bold text-5xl  ">
        <p className="leading-[56px]">
          John Wick 3 : <br /> Parabellum
        </p>
      </div>
      <div className={`${styles.heroSubtext} flex flex-col gap-4`}>
        <div className="flex gap-[20px]">
          <div className="flex gap-[10px] justify-center items-center">
            <Image src={imdbImage} alt="imdb icon" />
            <p>86.0/100</p>
          </div>
          <div className="flex gap-[10px] justify-center items-center">
            <Image src={ratingIcon} alt="rating" />
            <p>97%</p>
          </div>
        </div>
        <div className={`${styles.description} max-w-[404px]`}>
          <p>
            John Wick is on the run after killing a member of the international
            assassins' guild, and with a $14 million price tag on his head, he
            is the target of hit men and women everywhere.
          </p>
        </div>
        <button className="w-[169px] h-[36px] bg-red-600 py-[6px] px-[16px] flex items-center justify-center rounded-[6px] gap-[8px] cursor-pointer">
          <Image src={Play} alt="play button" />
          <p>Watch Trailer</p>
        </button>
      </div>
    </div>
  );
};

export default Hero;
