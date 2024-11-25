"use client";
import { useState, useEffect } from "react";
import ServiceTable from "../servicetable/page";
import Link from "next/link";
import Search from "@/components/Search";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const ServiceCheck = () => {
  const [state, setState] = useState({
    datas: [],
    open: false,
    editOpen: false,
    deleteOpen: false,
    selectUser: "",
    dataResults: "",
    searchItem: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("http://localhost:3000/api/service-check").then((res) => {
      // axios.get(`${process.env.URL}/api/service-check`).then((res) => {
      let data = res.data;
      console.log(data, "dkdk");
      let old = { ...state };
      old.datas = data;
      old.dataResults = data;
      console.log("data", old.datas);
      setState(old);
    });
  };

  const saveUser = (user) => {
    axios
      .post("", user)
      .then((x) => {
        let old = { ...state };
        old.open = false;
        old.datas = [...old.datas, x.data];
        old.selectUser = ""; // Reset selectUser
        setState(old);
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <div className="h-full w-full bg-green-600 flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800 flex flex-wrap items-center justify-between px-4 py-2">
        <div className="text-white text-center flex items-center gap-2 lg:text-lg md:text-xl sm:text-sm uppercase">
          Welcome to Service Check Platform
          <div className="w-[120px] h-[30px] text-sm bg-white text-black rounded-md lg:flex items-center justify-center hidden">
            Total : <span className="text-red-700 font-bold ml-2">{}</span>
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
            <Link href="/servicecheck/add">
              <AddIcon fontSize="medium" />
            </Link>
          </Button>
          <input
            type="search"
            id="search"
            className="bg-gray-50 border w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <p style={{ flex: 1.5 }}>Device ID</p>
              <p style={{ flex: 1.5 }}>Reg No</p>
              <p style={{ flex: 1 }}>Customer No</p>
              <p style={{ flex: 1 }}>District</p>
              <p style={{ flex: 1 }}>Address</p>
              <p style={{ flex: 1 }}>Insert Date</p>
              <p style={{ flex: 1 }}>Pro_Ins_Date</p>
              <p style={{ flex: 2 }}>Problems</p>
            </div>
            <p className="w-1/5 text-center hidden lg:block ">Action</p>
          </div>
          <div className="h-[92%] w-full overflow-auto">
            {state.datas.map((item, i) => (
              <ServiceTable key={i} item={item} />
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
