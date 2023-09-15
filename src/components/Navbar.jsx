"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import logo from "public/Logo.png";
import searchIcon from "public/Search.svg";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "@/context/context";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const { getSearchTerm } = useGlobalContext();

  // console.log(movies);
  const handleSearchInputChange = (e) => {
    // getSearchTerm(e.target.value)
    // console.log(e.target.value);
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    getSearchTerm(searchInput);
  };

  return (
    <nav className={styles.navBarWrapper}>
      <div className={styles.navBar}>
        <Image src={logo} alt="logo" className={styles.logo} />
        <div className={styles.searchInputWrapper}>
          <input
            onChange={handleSearchInputChange}
            type="text"
            className={styles.searchInput}
            placeholder="What do you want to watch?"
          />
          <Image
            src={searchIcon}
            alt="search"
            className={styles.searchIcon}
            onClick={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className={`${styles.signInText} text-white sm-hidden`}>Sign in</p>
          <div className="rounded-[18px] bg-red-600 h-[36px] w-[36px] flex items-center justify-center cursor-pointer">
            <FaBars className="text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
