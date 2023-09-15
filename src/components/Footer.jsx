import React from "react";
import facebookIcon from "public/facebook.png";
import instagramIcon from "public/instagram.png";
import twitterIcon from "public/twitter.png";
import youtubeIcon from "public/youtube.png";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col gap-5 text-[12px] md:text-[18px] items-center justify-center py-20">
      <div className="flex gap-[48px]">
        <Image alt="facebookIcon" src={facebookIcon} />
        <Image alt="instagramIcon" src={instagramIcon} />
        <Image alt="twitterIcon" src={twitterIcon} />
        <Image alt="youtubeIcon" src={youtubeIcon} />
      </div>
      <div className="font-bold ">
        <ul className="flex  gap-[48px]">
          <li>Conditions of Use</li>
          <li>Privacy & Policy</li>
          <li>Press Room</li>
        </ul>
      </div>
      <div>
        <p>© 2021 MovieBox by Adriana Eka Prayudha</p>
      </div>
    </div>
  );
};

export default Footer;
