"use client";
import { useState, useEffect } from "react";
import ServiceTable from "../servicetable/page";
import Link from "next/link";
import { Button, Checkbox, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import FacebookTable from "../facebooktable/page";
import { parseISO, format } from "date-fns";

const ServiceCheck = () => {
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
    axios.get("/api/user").then((res) => {
      let data = res.data;
      let old = { ...state };
      old.datas = data;
      old.dataResults = data;
      console.log("data", old.datas);
      setState(old);
    });
  };

  const currentDayTask = state.datas.filter(
    (item) => item.probabel_install_date === item.insert_date
  );

  console.log(currentDayTask, "tataa");

  const searchText = (e) => {
    let searchTxt = e.target.value.toLowerCase();
    console.log(searchTxt);
    let old = { ...state };
    if (searchTxt === "") {
      old.datas = [...old.dataResults];
    } else {
      old.datas = [...old.dataResults].filter((x) => {
        return (
          (x.customer_name &&
            x.customer_name.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.district &&
            x.district.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.address &&
            x.address.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.customer_phone &&
            String(x.customer_phone)
              .toLowerCase()
              .includes(searchTxt.toLowerCase())) ||
          (x.comments &&
            x.comments.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.insert_date &&
            String(x.insert_date)
              .toLowerCase()
              .includes(searchTxt.toLowerCase())) ||
          (x.probable_install_date &&
            x.probable_install_date
              .toLowerCase()
              .includes(searchTxt.toLowerCase()))
        );
      });
    }
    old.searchItem = searchTxt;
    console.log(old.searchItem);
    setState(old);
  };

  const nextDayFilter = (date) => {
    let ddd = new Date(date);
    let today = new Date();
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);

    let nextDay = new Date(today.getTime());
    nextDay.setDate(nextDay.getDate() + 1);
    return (
      ddd.getTime() >= today.getTime() && ddd.getTime() <= nextDay.getTime()
    );
  };

  const onCheckChanged = (e) => {
    let old = { ...state };
    old.nextday = !old.nextday;

    if (old.nextday) {
      old.datas = [...old.dataResults].filter((x) =>
        nextDayFilter(x.probabel_install_date)
      );
    } else {
      old.datas = [...old.dataResults];
    }
    setState(old);
  };

  return (
    <div className="h-full w-full bg-green-600 flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800 flex flex-wrap items-center justify-between px-4 py-2">
        <div className="text-white text-center flex items-center gap-2 lg:text-lg md:text-xl sm:text-sm uppercase">
          Welcome to Facebook Platform
          <div className="w-[140px] h-[30px] text-sm bg-white text-black rounded-md lg:flex items-center justify-center hidden">
            Pending :
            {/* <span className="text-red-700 font-bold ml-2">{dontcomplete}</span> */}
          </div>
          <div className="w-[120px] h-[30px] text-sm bg-white text-black rounded-md lg:flex items-center justify-center hidden">
            <Link href={"/servicecheck/done"}>
              Done :
              {/* <span className="text-red-700 font-bold ml-2">{complete}</span> */}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-white hidden uppercase lg:flex">Tomorrow</p>
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
          </Tooltip>
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
            <Link href="/facebook/add">
              <AddIcon fontSize="medium" />
            </Link>
          </Button>
          <input
            type="search"
            id="search"
            className="rounded-md p-2"
            placeholder="Search..."
            value={state.searchItem}
            onChange={searchText}
          />
        </div>
      </div>

      <div className="h-[90vh] w-full bg-gray-500 flex items-center justify-center">
        <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md overflow-auto lg:overflow-x-auto">
          <div className="w-full flex bg-cyan-900 text-white text-sm uppercase py-2">
            <div className="lg:flex lg:flex-[1] lg:gap-2 px-2 hidden">
              <p style={{ flex: 1 }}>Customer Name</p>
              <p style={{ flex: 1 }}>Customer No</p>
              <p style={{ flex: 1 }}>District</p>
              <p style={{ flex: 1 }}>Address</p>
              <p style={{ flex: 1 }}>Insert_Date</p>
              <p style={{ flex: 1 }}>Pro_Ins_Date</p>
              <p style={{ flex: 3 }}>Comments</p>
            </div>
            <p className="w-1/5 text-center hidden lg:block ">Action</p>
          </div>
          <div className="h-[92%] w-full overflow-auto">
            {state.datas.map((item, i) => (
              <FacebookTable key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCheck;

// export const dynamic = "force-dynamic";

// import ServiceTable from "../servicetable/page";
// import Link from "next/link";
// import Search from "@/components/Search";
// import { Button } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// const ServiceCheck = async () => {
//   const getData = async () => {
//     try {
//       const res = await fetch(`${process.env.URL}/api/service-check`, {
//         method: "GET",
//         cache: "no-store",
//       });

//       if (!res.ok) {
//         throw new Error(`Error fetching data: ${res.status}`);
//       }

//       return await res.json();
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return { error: "Failed to fetch data" };
//     }
//   };

//   let datas = await getData();

//   const trueCount = datas.filter((item) => item.is_complete === true).length;
//   const total = datas.length;
//   // console.log("dajklfs", datas);

//   return (
//     <div className="h-full w-full bg-green-600 flex flex-col items-center justify-center">
//       <div className="h-[10vh] w-full bg-cyan-800 flex flex-wrap items-center justify-between px-4 py-2">
//         <div className="text-white text-center flex items-center gap-2 lg:text-lg md:text-xl sm:text-sm uppercase">
//           Welcome to Service Check Platform
//           <div className="w-[120px] h-[30px] text-sm bg-white text-black rounded-md lg:flex items-center justify-center hidden">
//             Total : <span className="text-red-700 font-bold ml-2">{total}</span>
//           </div>
//           <div className="w-[120px] h-[30px] text-sm bg-white text-black rounded-md lg:flex items-center justify-center hidden">
//             <Link href={"/completetable"}>
//               Complete :{" "}
//               <span className="text-red-700 font-bold ml-2">{trueCount}</span>
//             </Link>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant="contained"
//             fontSize="large"
//             className="bg-white text-black"
//           >
//             <Link href="/">HOME</Link>
//           </Button>
//           <Button
//             variant="contained"
//             fontSize="large"
//             className="bg-white text-black"
//           >
//             <Link href="/servicecheck/add">
//               <AddIcon fontSize="medium" />
//             </Link>
//           </Button>

//           <Search initialData={datas} />
//         </div>
//       </div>

//       <div className="h-[90vh] w-full bg-gray-500 flex items-center justify-center">
//         <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md overflow-auto lg:overflow-x-auto">
//           <div className="w-full flex bg-cyan-900 text-white text-sm uppercase py-2">
//             <div className="lg:flex lg:flex-1 px-2 hidden">
//               <p style={{ flex: 1.5 }}>Device ID</p>
//               <p style={{ flex: 1.5 }}>Reg No</p>
//               <p style={{ flex: 1 }}>Customer No</p>
//               <p style={{ flex: 1 }}>District</p>
//               <p style={{ flex: 1 }}>Address</p>
//               <p style={{ flex: 1 }}>Insert Date</p>
//               <p style={{ flex: 1 }}>Pro_Ins_Date</p>
//               <p style={{ flex: 2 }}>Problems</p>
//             </div>
//             <p className="w-1/5 text-center hidden lg:block ">Action</p>
//           </div>
//           <div className="h-[92%] w-full overflow-auto">
//             {datas &&
//               datas.map((item, i) => <ServiceTable key={i} item={item} />)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceCheck;
// export const dynamic = "force-dynamic";
