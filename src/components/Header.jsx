import Image from "next/image";
import React from "react";
import styles from "./header.module.css";
import Poster from "public/Poster.png";
import Navbar from "./Navbar";
import Hero from "./Hero";

const Header = () => {
  return (
    <div className={`${styles.headerWrapper} flex flex-col justify-center`}>
      <Image src={Poster} alt="poster" className={styles.img} fill={true} />
      <Navbar />
      <Hero />
    </div>
  );
};

export default Header;
