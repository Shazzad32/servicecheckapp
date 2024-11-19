import Image from "next/image";
import TTTImage from "./images/City_driver.fd3eed00.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[100vh] w-ful grid items-start">
      <div className="h-[12vh] w-full bg-white shadow-lg">
        <div className="h-full w-[30%]  flex justify-center items-center gap-6 text-white font-semibold">
          <button className="bg-blue-400 p-2 w-[100px] rounded-md  uppercase">
            <Link href="/servicecheck">Service</Link>
          </button>
          <button className="bg-blue-400 p-2 w-[100px] rounded-md uppercase">
            <Link href="/sim">sim</Link>
          </button>
        </div>
      </div>
      <div className="h-[88vh] w-full flex items-center justify-center">
        <div className="h-[85vh] w-[90%] grid md:grid-cols-2">
          <div className="text-black p-4 h-auto w-full flex items-center justify-center">
            <div className="mb-4 font-medium text-5xl uppercase flex flex-col justify-center items-center  leading-normal	">
              <p>Welcome</p>
              <p>to</p>
              <p>sultan tracker</p>
            </div>
          </div>
          <Image src={TTTImage} alt="home image" className="w-screen h-full" />
        </div>
      </div>
    </div>
  );
}
