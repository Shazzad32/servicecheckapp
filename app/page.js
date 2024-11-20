import Image from "next/image";
import ImageBG from "./images/City_driver.fd3eed00.svg";
import Link from "next/link";
import { Button } from "@mui/material";
import Test from "@/components/Test";

export default function Home() {
  return (
    <div className="h-[100vh] w-ful grid items-start">
      <div className="h-[12vh] w-full bg-white shadow-lg">
        <div className="h-full w-[15%]  flex justify-center items-center gap-6 ml-4 text-white font-semibold">
          <Button variant="contained" size="medium">
            <Link href="/servicecheck">Service</Link>
          </Button>
          <Button variant="contained" size="medium">
            <Link href="/sim">sim</Link>
          </Button>
          <Test />
        </div>
      </div>
      <div className="h-[88vh] w-full flex items-center justify-center">
        <div className="h-[85vh] w-[90%] grid md:grid-cols-2">
          <div className="text-black p-4 h-auto w-full flex items-center justify-center">
            <div className="mb-4 font-medium text-5xl uppercase flex flex-col justify-center items-center  leading-normal">
              <p>Welcome</p>
              <p>to</p>
              <p>sultan tracker</p>
            </div>
          </div>
          <Image src={ImageBG} alt="home image" className="w-screen h-full" />
        </div>
      </div>
    </div>
  );
}
