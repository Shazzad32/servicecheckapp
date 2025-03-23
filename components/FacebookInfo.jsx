// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// // import { DropdownMenuDemo } from "./DropdownMenuDemo";
// import FacebookTable from "@/app/facebook/facebooktable/page";

// const headers = [
//   "Customer Name",
//   "Customer No",
//   "District",
//   "Address",
//   "Device_Price",
//   "Service Charge",
//   "Insert_Date",
//   "Pro_Ins_Date",
//   "Reference",
//   "State",
//   "Comments",
// ];

// const FacebookInfo = ({ user }) => {
//   const [state, setState] = useState({
//     data: [...user],
//     search: "",
//   });

//   const handleSearch = (e) => {
//     const search = e.target.value.toLowerCase();
//     setState((prev) => ({
//       ...prev,
//       search: search,
//     }));
//   };

//   // useEffect(() => {
//   //   let filterDEvices = [];

//   //   if (state.search === "") {
//   //     filterDEvices = [...devices];
//   //   } else {
//   //     filterDEvices = [...devices].filter(
//   //       (x) =>
//   //         x.device_id.toLowerCase().includes(state.search.toLowerCase()) ||
//   //         x.issue_by.toLowerCase().includes(state.search.toLowerCase()) ||
//   //         x.device_type.toLowerCase().includes(state.search.toLowerCase()) ||
//   //         x.device_model.toLowerCase().includes(state.search.toLowerCase()) ||
//   //         x.district.toLowerCase().includes(state.search.toLowerCase())
//   //     );
//   //   }

//   //   setState((prev) => ({
//   //     ...prev,
//   //     data: [...filterDEvices],
//   //   }));
//   // }, [state.search]);

//   // const non_voice = state.data.filter(
//   //   (x) => x.send_to === "Retail" && x.device_type === "Non_Voice"
//   // ).length;
//   // const voice = state.data.filter(
//   //   (x) => x.send_to === "Retail" && x.device_type === "Voice"
//   // ).length;

//   return (
//     <div className="h-screen w-full flex flex-col bg-red-400">
//       <div className="h-[10%]">div_1</div>
//       <div className="h-[90%] flex bg-white p-1">
//         <div className="h-[10%] bg-red-700 flex flex-col">
//           <div className="h-[10%] bg-red-700 flex items-center">
//             {headers.map((x) => (
//               <p key={x} className="text-white uppercase">
//                 {x}
//               </p>
//             ))}
//           </div>
//           <div className="h-[90%] bg-red-900 overflow-y-auto">
//             {state.data.map((x, i) => (
//               <div
//                 key={i}
//                 className={`${i % 2 == 0 ? "bg-slate-100" : "bg-slate-200"}`}
//               >
//                 <FacebookTable item={x} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FacebookInfo;

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FacebookTable from "./FacebookTable";

const headers = [
  "Name",
  "Phone",
  "District",
  "Address",
  "Price",
  "Charge",
  "Insert Date",
  "Pro Ins Date",
  "Reference",
  "State",
  "Comments",
];

const FacebookInfo = ({ user }) => {
  const [state, setState] = useState({
    datas: user,
    searchItem: "",
    isBlocked: false,
    selectedDate: null,
  });

  useEffect(() => {
    axios.get("/api/user").then((res) => {
      setState((prev) => ({ ...prev, datas: res.data }));
    });
  }, []);

  const filterTasks = (condition) => state.datas.filter(condition);

  const pendingTasks = filterTasks(
    (item) => !item.is_complete && item.state !== "BLOCKED"
  ).sort((a, b) => new Date(b.insert_date) - new Date(a.insert_date));

  const blockedTasks = filterTasks(
    (item) => !item.is_complete && item.state === "BLOCKED"
  ).sort((a, b) => new Date(b.insert_date) - new Date(a.insert_date));

  const completedWork = filterTasks(
    (item) => item.is_complete && item.quantity
  ).reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    const searchTxt = e.target.value.toLowerCase();
    setState((prev) => ({
      ...prev,
      searchItem: searchTxt,
      datas: searchTxt
        ? user.filter((x) =>
            Object.values(x).some((value) =>
              value?.toString().toLowerCase().includes(searchTxt)
            )
          )
        : user,
    }));
  };

  const toggleBlocked = () =>
    setState((prev) => ({ ...prev, isBlocked: !prev.isBlocked }));

  const onDateChange = (date) => {
    setState((prev) => ({
      ...prev,
      selectedDate: date,
      datas: user.filter(
        (item) =>
          new Date(item.probabel_install_date).toDateString() ===
          new Date(date).toDateString()
      ),
    }));
  };

  return (
    <div className="h-full w-fullflex flex-col items-center justify-center">
      <header className="h-[10vh] w-full bg-gray-700 flex items-center justify-between px-4 py-2">
        <div className="text-red-400 flex gap-4 lg:text-lg uppercase">
          Facebook
          <span className="info-box text-white">
            Pending:{" "}
            <strong className="text-orange-300">{pendingTasks.length}</strong>
          </span>
          <Link href="/facebook/done" className="info-box text-white">
            Done: <strong className="text-orange-300">{completedWork}</strong>
          </Link>
          <button className="info-box text-white" onClick={toggleBlocked}>
            Blocked:{" "}
            <strong className="text-orange-300">{blockedTasks.length}</strong>
          </button>
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <Link href="/" className="btn text-white">
            HOME
          </Link>
          <Link href="/facebook/add" className="btn text-white">
            <AddIcon />
          </Link>
          <LocalizationProvider dateAdapter={AdapterDateFns} className="p-1">
            <DatePicker
              className="bg-white rounded-md w-[200px]"
              label="Select Date"
              value={state.selectedDate}
              onChange={onDateChange}
            />
          </LocalizationProvider>
          <input
            type="search"
            placeholder="Search..."
            className="h-[40px] px-4 search-box rounded-md flex items-center justify-center text-black "
            value={state.searchItem}
            onChange={handleSearch}
          />
        </div>
      </header>

      <main className="h-[90vh] w-full bg-gray-500 flex items-center justify-center">
        <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md overflow-auto">
          <div className="w-full h-[8%] bg-gray-700 text-[14px] font-bold text-white flex items-center">
            <div className="w-[90%] flex justify-between p-2 uppercase">
              {headers.map((header) => (
                <p key={header} className="flex flex-[0.9]">
                  {header}
                </p>
              ))}
            </div>
            <div className="w-[10%] flex justify-center items-center uppercase">
              Action
            </div>
          </div>
          <div className="h-[92%] w-full overflow-x-auto justify-between">
            {(state.isBlocked ? blockedTasks : pendingTasks).map((item, i) => (
              <div
                key={i}
                className={`${i % 2 === 0 ? "bg-blue-100" : "bg-gray-300"}`}
              >
                <FacebookTable key={i} item={item} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacebookInfo;
