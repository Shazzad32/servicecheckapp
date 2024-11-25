"use client";
import SimTable from "../simtable/page";
import Link from "next/link";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import axios from "axios";

const Sim = () => {
  const [state, setState] = useState({
    datas: [],
    dataResults: "",
    searchItem: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/api/number").then((res) => {
      let data = res.data;
      let old = { ...state };
      old.datas = data;
      old.dataResults = data;
      setState(old);
    });
  };

  const searchText = (e) => {
    let searchTxt = e.target.value.toLowerCase();
    console.log(searchTxt);
    let old = { ...state };
    if (searchTxt === "") {
      old.datas = [...old.dataResults];
    } else {
      old.datas = [...old.dataResults].filter((x) => {
        return (
          (x.device_id &&
            x.device_id.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.active_date &&
            x.active_date.toLowerCase().includes(searchTxt.toLowerCase()))
        );
      });
    }
    old.searchItem = searchTxt;
    console.log(old.searchItem);
    setState(old);
  };

  const total_number = state.datas.length;

  // const getData = async () => {
  //   try {
  //     const res = await fetch(`${process.env.URL}/api/number`, {
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

  // let datas = await getData();
  // console.log("simNumber is", datas);

  // const trueCount = datas.filter((item) => item.is_complete === true).length;
  // const total = datas.length;

  return (
    <div className="h-full w-full bg-green-600 flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800 flex flex-wrap items-center justify-between px-4 py-2">
        <div className="text-white text-center flex items-center gap-2 lg:text-lg md:text-xl sm:text-sm uppercase">
          Welcome to Robi Sim Platform{" "}
          <div className="w-[120px] h-[30px] text-sm bg-white text-black rounded-md lg:flex items-center justify-center hidden">
            Total :{" "}
            <span className="text-red-700 font-bold ml-2">{total_number}</span>
          </div>
          <div className="w-[120px] h-[30px] text-sm bg-white text-black rounded-md lg:flex items-center justify-center hidden">
            <Link href={"/completetable"}>
              Complete : <span className="text-red-700 font-bold ml-2">{}</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="contained"
            fontSize="large"
            className="bg-white text-black"
          >
            <Link href="/">HOME</Link>
          </Button>
          <Button
            variant="contained"
            fontSize="large"
            className="bg-white text-black"
          >
            <Link href="/sim/add">
              <AddIcon fontSize="medium" />
            </Link>
          </Button>
          <input
            type="search"
            id="search"
            className="rounded-md border border-gray-200 py-[9px] p-4 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Search..."
            value={state.searchItem}
            onChange={searchText}
          />
        </div>
      </div>

      <div className="h-[90vh] w-full bg-gray-500 flex items-center justify-center">
        <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md overflow-auto lg:overflow-x-auto">
          <div className="w-full flex bg-cyan-900 text-white text-sm uppercase py-2">
            <div className="lg:flex lg:flex-1 px-2 hidden">
              <p style={{ flex: 3.3 }}>Number</p>
              <p style={{ flex: 3.3 }}>Active Date</p>
              <p style={{ flex: 3.3 }}>Status</p>
            </div>
            <p className="w-1/5 text-center hidden lg:block ">Action</p>
          </div>
          <div className="h-[92%] w-full overflow-auto">
            {state.datas.map((item, i) => (
              <SimTable key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sim;
export const dynamic = "force-dynamic";
