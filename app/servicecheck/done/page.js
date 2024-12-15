"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ServiceDoneTable from "./donetable/page";
import Link from "next/link";

const ServiceDone = () => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetchActiveData();
  // }, []);

  // const fetchActiveData = () => {
  //   axios.get("/api/service-check").then((res) => {
  //     setData(res.data);
  //   });
  // };

  const [state, setState] = useState({
    datas: [],
    dataResults: "",
    searchItem: "",
    nextday: false,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/api/service-check").then((res) => {
      let data = res.data;
      console.log(data, "dkdk");
      let old = { ...state };
      old.datas = data;
      old.dataResults = data;
      console.log("data", old.datas);
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
          (x.district &&
            x.district.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.address &&
            x.address.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.reg_no &&
            x.reg_no.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.problems &&
            x.problems.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.insert_date &&
            String(x.insert_date)
              .toLowerCase()
              .includes(searchTxt.toLowerCase())) ||
          (x.customer_number &&
            x.customer_number.toLowerCase().includes(searchTxt.toLowerCase()))
        );
      });
    }
    old.searchItem = searchTxt;
    console.log(old.searchItem);
    setState(old);
  };

  const trueCount = state.datas.filter((item) => item.is_complete === true);

  return (
    <div className="h-full w-full bg-cyan-800  flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800  flex items-center justify-center text-white text-lg uppercase">
        <div className="flex-[3.3] flex justify-start ml-4 items-center">
          <button className="bg-white h-[35px] w-[65px] text-black rounded">
            <Link href="/servicecheck">Back</Link>
          </button>
        </div>
        <div className="flex-[3.3] lg:text-lg text-[12px]">
          Completed Services
        </div>
        <div className="flex-[3.3] flex justify-end ">
          {" "}
          <input
            type="search"
            id="search"
            className="rounded-md p-2 lg:w-[50%] w-full  lg:mr-10 mr-4  text-black"
            placeholder="Search..."
            value={state.searchItem}
            onChange={searchText}
          />
        </div>
      </div>
      <div className="h-[90vh] w-full bg-gray-500 flex items-center justify-center">
        <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md overflow-auto lg:overflow-x-auto">
          <div className="w-full flex bg-cyan-800  text-white text-sm uppercase py-2">
            <div className="lg:flex lg:flex-[1] lg:gap-2 p-2 hidden">
              <p style={{ flex: 1.2 }}>Device ID</p>
              <p style={{ flex: 1.3 }}>Reg No</p>
              <p style={{ flex: 1 }}>Customer No</p>
              <p style={{ flex: 1 }}>District</p>
              <p style={{ flex: 1 }}>Address</p>
              <p style={{ flex: 1 }}>Service Fee</p>
              <p style={{ flex: 1 }}>Insert Date</p>
              <p style={{ flex: 1 }}>Pro_Ins_Date</p>
              <p style={{ flex: 1.5 }}>Problems</p>
            </div>
            <p className="w-1/5 text-center hidden lg:block">Action</p>
          </div>
          <div className="h-[92%] w-full overflow-auto">
            {trueCount.map((item, i) => (
              <ServiceDoneTable item={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDone;
