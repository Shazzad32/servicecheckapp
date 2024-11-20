import { FaPlus } from "react-icons/fa6";
import ServiceTable from "../servicetable/page";
import Link from "next/link";

const ServiceCheck = async () => {
  // const getData = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/api/service-check", {
  //       method: "GET",
  //       cache: "no-store",
  //     });

  //     if (!res.ok) {
  //       throw new Error(`Error fetching data: ${res.status}`);
  //     }

  //     return await res.json();
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     return { error: "Failed to fetch data" };
  //   }
  // };
  const getData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/service-check", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Error fetching data: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return { error: "Failed to fetch data" };
    }
  };

  let datas = await getData();
  // console.log("Fetched Data:", datas);

  return (
    <div className="h-[100vh] w-full bg-green-600 flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800 flex">
        <div className="h-full w-[20%] flex items-center"></div>
        <div className="h-full w-[50%] lg:text-lg md:text-md sm:text-[10px] flex items-center justify-center uppercase text-white">
          welcome to service check platform
        </div>
        <div className="h-full w-[30%] flex items-center justify-center gap-4">
          <button className="bg-white p-3 text-black rounded-md">
            <Link href={"/servicecheck/add"}>
              <FaPlus />
            </Link>
          </button>
          <input
            // value={searchItem}
            // onChange={searchText}
            type="search"
            placeholder="Search..."
            className="h-[40px] p-2 text-black border-none rounded-md"
          ></input>
        </div>
      </div>
      <div className="h-[90vh] w-full bg-cyan-400 flex items-center justify-center">
        <div className="h-[98%] w-[99%] bg-white">
          <div className="h-[8%] w-full bg-cyan-900 flex text-white">
            <div
              style={{
                width: "80%",
                display: "flex",
                alignItems: "center",
                padding: 10,
              }}
              className="uppercase"
            >
              <p style={{ flex: 1.2 }}>Device id</p>
              <p style={{ flex: 1.5 }}>Reg No</p>
              <p style={{ flex: 1.2 }}>Customer No</p>
              <p style={{ flex: 1 }}>District</p>
              <p style={{ flex: 1 }}>Address</p>
              <p style={{ flex: 1 }}>Insert Date</p>
              <p style={{ flex: 1.5 }}>Problems</p>
            </div>
            <div className="w-[20%] h-full flex uppercase items-center justify-center">
              Action
            </div>
          </div>
          <div className="h-[92%] w-full overflow-auto">
            {datas.map((item, i) => {
              return <ServiceTable key={i} item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCheck;
export const dynamic = "force-dynamic";
