"use client";
import React from "react";
import styles from "./loading.module.css";
import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <InfinitySpin width="200" color="#dc2626" />
    </div>
  );
};

export default Loading;
