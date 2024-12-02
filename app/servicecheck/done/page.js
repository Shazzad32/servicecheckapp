"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Link from "next/link";

const ServiceDone = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchActiveData();
  }, []);

  const fetchActiveData = () => {
    axios.get("/api/service-check").then((res) => {
      setData(res.data);
    });
  };

  const trueCount = data.filter((item) => item.is_complete === true);

  return (
    <div className="h-full w-full bg-cyan-800  flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800  flex items-center justify-center text-white text-lg uppercase">
        Completed Services
        <Button
          variant="contained"
          fontSize="large"
          className="bg-white text-black flex justify-end"
        >
          <Link href="/servicecheck">back</Link>
        </Button>
      </div>
      <div className="h-[90vh] w-full bg-gray-500 flex items-center justify-center">
        <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md overflow-auto lg:overflow-x-auto">
          <div className="w-full flex bg-cyan-800  text-white text-sm uppercase py-2">
            <div className="lg:flex lg:flex-[1] lg:gap-2 px-2 hidden">
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
              <div key={i} className="flex border-b">
                <div className="flex-[1.2] px-2">{item.device_id}</div>
                <div className="flex-[1.3] px-2">{item.reg_no}</div>
                <div className="flex-[1] px-2">{item.customer_number}</div>
                <div className="flex-[1] px-2">{item.district}</div>
                <div className="flex-[1] px-2">{item.address}</div>
                <div className="flex-[1] px-2">{item.service_fee}</div>
                <div className="flex-[1] px-2">{item.insert_date}</div>
                <div className="flex-[1] px-2">
                  {item.probable_install_date}
                </div>
                <div className="flex-[1.5] px-2">{item.problems}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDone;
