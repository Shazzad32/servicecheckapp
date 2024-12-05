"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Link from "next/link";
import DoneFacebookTable from "../done/donetable/page";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const FacebookDone = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchActiveData();
  }, []);

  const fetchActiveData = () => {
    axios.get("/api/user").then((res) => {
      setData(res.data);
    });
  };

  const completeTask = data.filter((item) => item.is_complete == true);

  return (
    <div className="h-full w-full bg-cyan-800  flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800  flex items-center justify-center text-white text-lg uppercase">
        <div className="flex-[3.3] flex justify-start ml-4 items-center">
          <button className="bg-white text-black px-4 rounded">
            <Link href="/facebook">
              <KeyboardDoubleArrowLeftIcon />
            </Link>
          </button>
        </div>
        <div className="flex-[3.3] ">Completed Facebook Task</div>
        <div className="flex-[3.3] "></div>
      </div>
      <div className="h-[90vh] w-full bg-gray-500 flex items-center justify-center">
        <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md overflow-auto lg:overflow-x-auto">
          <div className="w-full flex bg-cyan-800  text-white text-sm uppercase py-2">
            <div className="lg:flex lg:flex-[1] lg:gap-2 px-2 hidden">
              <p style={{ flex: 1.2 }}>Customer Name</p>
              <p style={{ flex: 1.2 }}>Customer No</p>
              <p style={{ flex: 1.2 }}>District</p>
              <p style={{ flex: 1.2 }}>Address</p>
              <p style={{ flex: 1.2 }}>Insert_Date</p>
              <p style={{ flex: 1.2 }}>Pro_Ins_Date</p>
              <p style={{ flex: 1.2 }}>State</p>
              <p style={{ flex: 1.6 }}>Comments</p>
            </div>
            <p className="w-1/5 text-center hidden lg:block">Action</p>
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
