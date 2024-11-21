import { FaPlus } from "react-icons/fa6";
import ServiceTable from "../servicetable/page";
import Link from "next/link";

const ServiceCheck = async () => {
  const getData = async () => {
    try {
      const res = await fetch(`${process.env.URL}/api/service-check`, {
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

  return (
    <div className="h-full w-full bg-green-600 flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800 flex flex-wrap items-center justify-between px-4 py-2">
        <div className="text-white text-center lg:text-lg md:text-md sm:text-sm uppercase">
          Welcome to Service Check Platform
        </div>
        <div className="flex items-center gap-2">
          <Link href="/servicecheck/add">
            <button className="bg-white p-3 rounded-md">
              <FaPlus />
            </button>
          </Link>
          <input
            type="search"
            placeholder="Search..."
            className="h-10 p-2 rounded-md border-none"
          />
        </div>
      </div>

      <div className="h-[90vh] w-full bg-gray-500 flex items-center justify-center">
        <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md overflow-auto lg:overflow-x-auto">
          <div className="w-full flex bg-cyan-900 text-white text-sm uppercase py-2">
            <div className="lg:flex lg:flex-1 px-2 hidden">
              <p style={{ flex: 1.2 }}>Device ID</p>
              <p style={{ flex: 1.5 }}>Reg No</p>
              <p style={{ flex: 1.2 }}>Customer No</p>
              <p style={{ flex: 1 }}>District</p>
              <p style={{ flex: 1 }}>Address</p>
              <p style={{ flex: 1 }}>Insert Date</p>
              <p style={{ flex: 1.5 }}>Problems</p>
            </div>
            <p className="w-1/5 text-center">Action</p>
          </div>
          <div className="h-[92%] w-full overflow-auto">
            {datas &&
              datas.map((item, i) => <ServiceTable key={i} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCheck;
export const dynamic = "force-dynamic";
