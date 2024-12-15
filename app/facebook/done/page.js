"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Link from "next/link";
import DoneFacebookTable from "../done/donetable/page";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const FacebookDone = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    datas: [],
    dataResults: "",
    searchItem: "",
    nextday: false,
    is_Blocked: false,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/api/user").then((res) => {
      let data = res.data;
      let old = { ...state };
      old.datas = data;
      old.dataResults = data;
      console.log("data", old.datas);
      setState(old);
    });
  };

  // useEffect(() => {
  //   fetchActiveData();
  // }, []);

  // const fetchActiveData = () => {
  //   axios.get("/api/user").then((res) => {
  //     setData(res.data);
  //   });
  // };

  const searchText = (e) => {
    let searchTxt = e.target.value.toLowerCase();
    console.log(searchTxt);
    let old = { ...state };
    if (searchTxt === "") {
      old.datas = [...old.dataResults];
    } else {
      old.datas = [...old.dataResults].filter((x) => {
        return (
          (x.customer_phone &&
            x.customer_phone.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.district &&
            x.district.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.address &&
            x.address.toLowerCase().includes(searchTxt.toLowerCase()))
        );
      });
    }
    old.searchItem = searchTxt;
    console.log(old.searchItem);
    setState(old);
  };

  const completeTask = state.datas.filter((item) => item.is_complete == true);

  return (
    <div className="h-full w-full bg-cyan-800  flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800  flex items-center justify-center text-white text-lg uppercase">
        <div className="flex-[3.3] flex justify-start ml-4 items-center">
          <button className="bg-white h-[35px] w-[65px] text-black rounded">
            <Link href="/facebook">Back</Link>
          </button>
        </div>
        <div className="flex-[3.3] lg:text-[20px] text-[12px]">
          Completed Facebook Task
        </div>
        <div className="flex-[3.3] flex  items-center justify-end lg:mr-10 mr-4 ">
          <input
            type="search"
            id="search"
            className="rounded-md lg:p-2 p-1 px-2 lg:w-[50%] w-full text-black"
            placeholder="Search..."
            value={state.searchItem}
            onChange={searchText}
          />
        </div>
      </div>
      <div className="h-[90vh] w-full bg-gray-500 flex items-center justify-center">
        <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md overflow-auto lg:overflow-x-auto">
          <div className="w-full flex bg-cyan-900 text-white uppercase py-2">
            <div className="lg:flex lg:flex-[1] lg:gap-2 p-2 hidden">
              <p style={{ flex: 1, fontSize: 12 }}>Customer Name</p>
              <p style={{ flex: 1, fontSize: 12 }}>Customer No</p>
              <p style={{ flex: 1, fontSize: 12 }}>District</p>
              <p style={{ flex: 1, fontSize: 12 }}>Address</p>
              <p style={{ flex: 1, fontSize: 12 }}>Device_Price</p>
              <p style={{ flex: 1, fontSize: 12 }}>Service Charge</p>
              <p style={{ flex: 1, fontSize: 12 }}>Insert_Date</p>
              <p style={{ flex: 1, fontSize: 12 }}>Install_Date</p>
              {/* <p style={{ flex: 1, fontSize: 12 }}>State</p> */}
              <p style={{ flex: 1, fontSize: 12 }}>Comments</p>
            </div>
            <p className="w-1/5 text-center hidden lg:block text-[12px] items-center">
              Action
            </p>
          </div>
          <div className="h-[92%] w-full overflow-auto">
            {completeTask.map((item, i) => (
              <DoneFacebookTable item={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacebookDone;
