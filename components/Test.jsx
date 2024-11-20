"use client";

// import React from 'react'
import { useEffect } from "react";

const Test = () => {
  // console.log("NEXT_PUBLIC_BASE_URL:", process.env.MONGODB_URI);
  // console.log("Environment:", process.env.MONGODB_DB); // 'development' or 'production'
  // console.log("URL:", process.env.URL); // 'development' or 'production'
  useEffect(() => {
    console.log("NEXT_PUBLIC_BASE_URL:", process.env.MONGODB_URI);
    console.log("Environment:", process.env.MONGODB_DB); // 'development' or 'production'
    console.log("URL:", process.env.URL); // 'development' or 'production'
  }, []);
  return <div>Test</div>;
};

export default Test;
