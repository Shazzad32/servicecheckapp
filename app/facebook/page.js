"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Checkbox, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import FacebookTable from "../facebook/facebooktable/page";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";

const ServiceCheck = () => {
  const [state, setState] = useState({
    datas: [],
    dataResults: "",
    searchItem: "",
    nextday: false,
    is_Blocked: false,
    selectedDate: null,
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

  const blockedTask = state.datas.filter((item) => item.state === "BLOCKED");

  // const todayTask = state.datas.filter(
  //   (item) => item.insert_date === new Date()
  // );
  const completeTask = state.datas.filter((item) => item.is_complete === true);
  const pendingTask = state.datas.filter(
    (item) => item.is_complete === false && item.state != "BLOCKED"
  );

  const handleSearch = (e) => {
    const searchTxt = e.target.value.toLowerCase();
    setState((prev) => ({
      ...prev,
      searchItem: searchTxt,
      datas: searchTxt
        ? prev.dataResults.filter((x) =>
            Object.keys(x).some((key) =>
              x[key]?.toString().toLowerCase().includes(searchTxt)
            )
          )
        : [...prev.dataResults],
    }));
  };

  // const nextDayFilter = (date) => {
  //   let ddd = new Date(date);
  //   let today = new Date();
  //   today.setHours(23);
  //   today.setMinutes(59);
  //   today.setSeconds(59);

  //   let nextDay = new Date(today.getTime());
  //   nextDay.setDate(nextDay.getDate() + 1);
  //   return (
  //     ddd.getTime() >= today.getTime() && ddd.getTime() <= nextDay.getTime()
  //   );
  // };

  // const onCheckChanged = (e) => {
  //   let old = { ...state };
  //   old.nextday = !old.nextday;

  //   if (old.nextday) {
  //     old.datas = [...old.dataResults].filter((x) =>
  //       nextDayFilter(x.probabel_install_date)
  //     );
  //   } else {
  //     old.datas = [...old.dataResults];
  //   }
  //   setState(old);
  // };

  const toggleBlocked = () => {
    setState((prev) => ({
      ...prev,
      is_Blocked: !prev.is_Blocked,
    }));
  };

  const onDateChange = (date) => {
    const selectedDate = new Date(date).setHours(0, 0, 0, 0);
    const filteredData = state.dataResults.filter((item) => {
      const itemDate = new Date(item.probabel_install_date).setHours(
        0,
        0,
        0,
        0
      );
      return itemDate === selectedDate;
    });

    setState((prevState) => ({
      ...prevState,
      selectedDate: date,
      datas: filteredData,
    }));
  };

  return (
    <div className="h-full w-full bg-green-600 flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800 flex flex-wrap items-center justify-between px-4 py-2">
        <div className=" text-white text-center flex  gap-2 lg:text-lg md:text-sm sm:text-sm uppercase lg:p-0 sm:p-2">
          Facebook Platform
          <div className="w-[55px] lg:w-[100px] h-[30px] text-sm bg-white text-black rounded-md flex items-center justify-center">
            <p className="lg:flex hidden">Pending :</p>
            <span className="text-red-700 font-bold ml-2 flex">
              <p className="lg:hidden">P=</p>
              {pendingTask.length}
            </span>
          </div>
          <div className="w-[55px] lg:w-[100px] h-[30px] text-sm bg-white text-black rounded-md flex items-center justify-center">
            <Link href={"/facebook/done"} className="flex">
              <p className="lg:flex hidden"> Done :</p>
              <span className="text-red-700 font-bold ml-2 flex">
                <p className="lg:hidden">D=</p>
                {completeTask.length}
              </span>
            </Link>
          </div>
          <button
            className="w-[55px] lg:w-[100px] h-[30px] text-sm bg-white text-black rounded-md flex items-center justify-center"
            onClick={toggleBlocked}
          >
            <p className="hidden lg:flex">Blocked :</p>
            <span className="text-red-700 font-bold ml-2 flex">
              <p className="lg:hidden">B=</p>
              {blockedTask.length}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2 ">
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            className="text-white"
          >
            <div className="flex items-center gap-2">
              <DatePicker
                label="Select a Date"
                value={state.selectedDate}
                onChange={(date) => onDateChange(date)}
                renderInput={(params) => (
                  <button
                    {...params.inputProps}
                    className="bg-blue-500 text-white px-2 py-2 rounded border-white"
                  >
                    {state.selectedDate
                      ? new Date(state.selectedDate).toLocaleDateString()
                      : "Select Date"}
                  </button>
                )}
              />
            </div>
          </LocalizationProvider>
          {/* <p className="text-white hidden uppercase lg:flex">Tomorrow</p>
          <Tooltip title="Next Day" enterDelay={200} leaveDelay={200}>
            <Checkbox
              style={{
                height: "35px",
                width: "40px",
                color: "white",
              }}
              label="Next"
              checked={state.nextday}
              onChange={onCheckChanged}
            />
          </Tooltip> */}
          <button className="bg-white text-black px-2 py-1 rounded hover:bg-gray-300">
            <Link href="/">HOME</Link>
          </button>
          <button className="bg-white text-black px-2 p-0.5 rounded hover:bg-gray-300">
            <Link href="/facebook/add">
              {" "}
              <AddIcon fontSize="medium" />
            </Link>
          </button>
          <input
            type="search"
            id="search"
            className="rounded-md lg:p-2 p-1 px-2 lg:w-[50%] w-full text-black"
            placeholder="Search..."
            value={state.searchItem}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="h-[90vh] w-full bg-gray-500 flex items-center justify-center">
        <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md overflow-auto lg:overflow-x-auto">
          <div className="w-full flex bg-cyan-900 text-white uppercase">
            <div className="w-[80%] lg:flex lg:justify-evenly lg:items-center lg:flex-[1] lg:whitespace-nowrap lg:overflow-hidden lg:text-clip p-3 hidden">
              <p style={{ flex: 1, fontSize: 12 }}>Customer Name</p>
              <p style={{ flex: 1, fontSize: 12 }}>Customer No</p>
              <p style={{ flex: 1, fontSize: 12 }}>District</p>
              <p style={{ flex: 1, fontSize: 12 }}>Address</p>
              <p style={{ flex: 1, fontSize: 12 }}>Device_Price</p>
              <p style={{ flex: 1, fontSize: 12 }}>Service Charge</p>
              <p style={{ flex: 1, fontSize: 12 }}>Insert_Date</p>
              <p style={{ flex: 1, fontSize: 12 }}>Pro_Ins_Date</p>
              <p style={{ flex: 1, fontSize: 12 }}>State</p>
              <p style={{ flex: 1, fontSize: 12 }}>Comments</p>
            </div>
            <div className="w-[20%] lg:flex lg:items-center uppercase text-[12px] lg:justify-center hidden  ">
              <p>Action</p>
            </div>
          </div>
          <div className="h-[92%] w-full overflow-auto">
            {(state.is_Blocked ? blockedTask : pendingTask).map((item, i) => (
              <FacebookTable key={i} item={item} />
            ))}
            {/* {pendingTask.map((item, i) => (
              <FacebookTable key={i} item={item} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCheck;
// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button, Checkbox, Tooltip } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import axios from "axios";
// import FacebookTable from "../facebook/facebooktable/page";

// const ServiceCheck = () => {
//   const [state, setState] = useState({
//     datas: [],
//     dataResults: [],
//     searchItem: "",
//     nextday: false,
//   });

//   useEffect(() => {
//     axios.get("/api/user").then((res) => {
//       const data = res.data;
//       setState((prev) => ({ ...prev, datas: data, dataResults: data }));
//     });
//   }, []);

//   const todayTask = state.datas.filter(
//     (item) => item.insert_date === new Date()
//   );
//   const completeTask = state.datas.filter((item) => item.is_complete);
//   const pendingTask = state.datas.filter((item) => !item.is_complete);

//   const handleSearch = (e) => {
//     const searchTxt = e.target.value.toLowerCase();
//     setState((prev) => ({
//       ...prev,
//       searchItem: searchTxt,
//       datas: searchTxt
//         ? prev.dataResults.filter((x) =>
//             Object.keys(x).some((key) =>
//               x[key]?.toString().toLowerCase().includes(searchTxt)
//             )
//           )
//         : [...prev.dataResults],
//     }));
//   };

//   const toggleNextDay = () => {
//     setState((prev) => ({
//       ...prev,
//       nextday: !prev.nextday,
//       datas: !prev.nextday
//         ? prev.dataResults.filter((x) => nextDayFilter(x.probabel_install_date))
//         : [...prev.dataResults],
//     }));
//   };

//   const nextDayFilter = (date) => {
//     const ddd = new Date(date);
//     const today = new Date();
//     today.setHours(23, 59, 59);
//     const nextDay = new Date(today);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return ddd >= today && ddd <= nextDay;
//   };

//   return (
//     <div className="h-full w-full bg-green-600 flex flex-col items-center">
//       <header className="h-[10vh] w-full bg-cyan-800 flex items-center justify-between px-4">
//         <div className="text-white flex items-center gap-2 uppercase">
//           Welcome to Facebook Platform
//           <div className="bg-white text-black rounded-md hidden lg:flex items-center px-2">
//             Pending:{" "}
//             <span className="text-red-700 font-bold">{pendingTask.length}</span>
//           </div>
//           <div className="bg-white text-black rounded-md hidden lg:flex items-center px-2">
//             <Link href="/facebook/done">
//               Done:{" "}
//               <span className="text-red-700 font-bold">
//                 {completeTask.length}
//               </span>
//             </Link>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <Tooltip title="Next Day">
//             <Checkbox
//               style={{ color: "white" }}
//               checked={state.nextday}
//               onChange={toggleNextDay}
//             />
//           </Tooltip>
//           <Button variant="contained" className="bg-white text-black">
//             <Link href="/">HOME</Link>
//           </Button>
//           <Button variant="contained" className="bg-white text-black">
//             <Link href="/facebook/add">
//               <AddIcon fontSize="medium" />
//             </Link>
//           </Button>
//           <input
//             type="search"
//             placeholder="Search..."
//             value={state.searchItem}
//             onChange={handleSearch}
//             className="rounded-md p-2"
//           />
//         </div>
//       </header>
//       <main className="h-[90vh] w-full bg-gray-500 flex justify-center">
//         <div className="h-[98%] w-[99%] bg-white rounded-md overflow-auto shadow-2xl">
//           <div className="w-full bg-cyan-900 text-white text-sm uppercase py-2 flex">
//             <div className="lg:flex lg:flex-1 gap-2 lg:justify-evenly px-2 hidden">
//               {[
//                 "Customer Name",
//                 "Customer No",
//                 "District",
//                 "Address",
//                 "Insert_Date",
//                 "Pro_Ins_Date",
//                 "State",
//                 "Comments",
//               ].map((header) => (
//                 <p key={header} className="flex-1.2">
//                   {header}
//                 </p>
//               ))}
//             </div>
//             <p className="w-1/5 text-center hidden lg:block">Action</p>
//           </div>
//           <div className="h-[92%] overflow-auto">
//             {pendingTask.map((item, i) => (
//               <FacebookTable key={i} item={item} />
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ServiceCheck;
