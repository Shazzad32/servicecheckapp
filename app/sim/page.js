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
      old.datas = sortDataByDate(data);
      old.dataResults = sortDataByDate(data);
      setState(old);
    });
  };

  const sortDataByDate = (data) =>
    [...data].sort(
      (a, b) => new Date(b?.active_date) - new Date(a?.active_date)
    );

  const searchText = (e) => {
    let searchTxt = e.target.value.toLowerCase();
    console.log(searchTxt);
    let old = { ...state };
    if (searchTxt === "") {
      old.datas = [...old.dataResults];
    } else {
      old.datas = [...old.dataResults].filter((x) => {
        return (
          (x.number &&
            x.number.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.kcp_number &&
            x.kcp_number.toLowerCase().includes(searchTxt.toLowerCase())) ||
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

  return (
    <div className="h-full w-full bg-green-600 flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800 flex flex-wrap items-center justify-between px-4 py-2 lg:p-4 sm:p-2">
        <div className="text-white text-center flex items-center gap-2 lg:text-lg md:text-xl sm:text-sm uppercase lg:p-0 sm:p-2">
          Robi Sim Platform
          <div className="px-4 py-1 text-sm bg-white text-black rounded-md flex items-center justify-center">
            Total Number:
            <span className="text-red-700 font-bold ml-2">{total_number}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white text-black px-2 py-1 rounded hover:bg-gray-300">
            <Link href="/"> HOME</Link>
          </button>
          <button className="bg-white text-black px-2 p-0.5 rounded hover:bg-gray-300">
            <Link href="/sim/add">
              {" "}
              <AddIcon fontSize="medium" />
            </Link>
          </button>
          <input
            type="search"
            id="search"
            className="rounded-md py-1 px-1 lg:w-[70%] sm:w-[75%]"
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
              <p style={{ flex: 2.25 }}>Number</p>
              <p style={{ flex: 2.25 }}>KCP Number</p>
              <p style={{ flex: 2.25 }}>Active Date</p>
              <p style={{ flex: 2.25 }}>Status</p>
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
