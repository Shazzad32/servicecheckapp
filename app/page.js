"use client";
import Image from "next/image";
import ImageBG from "./images/City_driver.fd3eed00.svg";
import LoginComponent from "@/components/LoginComponent";
import Drawer from "./drower/page";
import { useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => {
    setLoggedIn(true);
  };
  return (
    <>
      {!loggedIn ? (
        <LoginComponent onLogin={handleLogin} />
      ) : (
        <div className="h-[100vh] w-ful grid items-start">
          <div className="h-[10vh] w-full bg-white shadow-lg">
            <div className="h-full w-[100%] lg:w-[30%]  flex justify-center items-center gap-6 ml-4 text-white font-semibold">
              <Drawer />
            </div>
          </div>
          <div className="h-[90vh] w-full flex items-center justify-center">
            <div className="h-[85vh] w-[90%] grid md:grid-cols-2">
              <div className="text-black p-4 h-auto w-full flex items-center justify-center">
                <div className="mb-4 text-2xl font-medium lg:text-5xl lg:leading-normal uppercase flex flex-col justify-center items-center leading-normal">
                  <p>Welcome</p>
                  <p>to</p>
                  <p>sultan tracker</p>
                </div>
              </div>
              <Image
                src={ImageBG}
                alt="home image"
                className="w-screen h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
