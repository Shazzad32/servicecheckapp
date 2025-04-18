// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import DoneFacebookTable from "../done/donetable/page";

// const FacebookDone = () => {
//   // const [data, setData] = useState([]);
//   const [state, setState] = useState({
//     datas: [],
//     dataResults: "",
//     searchItem: "",
//     nextday: false,
//     is_Blocked: false,
//   });

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     axios.get("/api/user").then((res) => {
//       let data = res.data;
//       let old = { ...state };
//       old.datas = data;
//       old.dataResults = data;
//       console.log("data", old.datas);
//       setState(old);
//     });
//   };

//   const searchText = (e) => {
//     let searchTxt = e.target.value.toLowerCase();
//     console.log(searchTxt);
//     let old = { ...state };
//     if (searchTxt === "") {
//       old.datas = [...old.dataResults];
//     } else {
//       old.datas = [...old.dataResults].filter((x) => {
//         return (
//           (x.customer_phone &&
//             x.customer_phone.toLowerCase().includes(searchTxt.toLowerCase())) ||
//           (x.district &&
//             x.district.toLowerCase().includes(searchTxt.toLowerCase())) ||
//           (x.address &&
//             x.address.toLowerCase().includes(searchTxt.toLowerCase()))
//         );
//       });
//     }
//     old.searchItem = searchTxt;
//     console.log(old.searchItem);
//     setState(old);
//   };

//   const completeTask = state.datas.filter((item) => item.is_complete == true);

//   return (
//     <div className="h-full w-full bg-cyan-800  flex flex-col items-center justify-center">
//       <div className="h-[10vh] w-full bg-cyan-800  flex items-center justify-center text-white text-lg uppercase">
//         <div className="flex-[3.3] flex justify-start ml-4 items-center">
//           <button className="bg-white h-[35px] w-[65px] text-black rounded">
//             <Link href="/facebook">Back</Link>
//           </button>
//         </div>
//         <div className="flex-[3.3] lg:text-[20px] text-[12px]">
//           Completed Facebook Task
//         </div>
//         <div className="flex-[3.3] flex  items-center justify-end lg:mr-10 mr-4 ">
//           <input
//             type="search"
//             id="search"
//             className="rounded-md lg:p-2 p-1 px-2 lg:w-[50%] w-full text-black"
//             placeholder="Search..."
//             value={state.searchItem}
//             onChange={searchText}
//           />
//         </div>
//       </div>
//       <div className="h-[90vh] w-full bg-gray-500 flex items-center justify-center">
//         <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md">
//           <div className="w-full flex bg-cyan-900 text-white uppercase">
//             <div className="w-[80%] lg:flex lg:flex-[1] lg:gap-2 p-3 hidden">
//               <p style={{ flex: 1, fontSize: 12 }}>Customer Name</p>
//               <p style={{ flex: 1, fontSize: 12 }}>Customer No</p>
//               <p style={{ flex: 1, fontSize: 12 }}>District</p>
//               <p style={{ flex: 1, fontSize: 12 }}>Address</p>
//               <p style={{ flex: 1, fontSize: 12 }}>Device_Price</p>
//               <p style={{ flex: 1, fontSize: 12 }}>Service Charge</p>
//               <p style={{ flex: 1, fontSize: 12 }}>Insert_Date</p>
//               <p style={{ flex: 1, fontSize: 12 }}>Install_Date</p>
//               <p style={{ flex: 1, fontSize: 12 }}>Comments</p>
//             </div>
//             <p className="w-[20%] hidden lg:flex text-[12px] lg:items-center lg:justify-center">
//               Action
//             </p>
//           </div>
//           <div className="h-[92%] w-full overflow-auto">
//             {completeTask.map((item, i) => (
//               <DoneFacebookTable item={item} key={i} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FacebookDone;

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import DoneFacebookTable from "../done/donetable/page";
import * as XLSX from "xlsx";
import { HiOutlineDownload } from "react-icons/hi";

const FacebookDone = () => {
  const [state, setState] = useState({
    datas: [],
    dataResults: "",
    searchItem: "",
    startDate: "",
    endDate: "",
    monthYear: "",
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
      setState(old);
    });
  };

  const searchText = (e) => {
    let searchTxt = e.target.value.toLowerCase();
    let old = { ...state };
    if (searchTxt === "") {
      old.datas = [...old.dataResults];
    } else {
      old.datas = [...old.dataResults].filter((x) => {
        return (
          (x.customer_phone &&
            x.customer_phone.toLowerCase().includes(searchTxt)) ||
          (x.district && x.district.toLowerCase().includes(searchTxt)) ||
          (x.address && x.address.toLowerCase().includes(searchTxt)) ||
          (x.reference && x.reference.toLowerCase().includes(searchTxt))
        );
      });
    }
    old.searchItem = searchTxt;
    setState(old);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const filterByDate = () => {
    const { startDate, endDate, dataResults } = state;
    if (startDate && endDate) {
      const filteredData = dataResults.filter((item) => {
        if (item.install_date) {
          const installDate = new Date(item.install_date).toLocaleDateString(
            "en-CA",
            {
              timeZone: "Asia/Dhaka",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }
          );
          const start = new Date(startDate).toLocaleDateString("en-CA", {
            timeZone: "Asia/Dhaka",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          const end = new Date(endDate).toLocaleDateString("en-CA", {
            timeZone: "Asia/Dhaka",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          return installDate >= start && installDate <= end;
        }
        return false;
      });
      setState({ ...state, datas: filteredData });
    }
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(state.datas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "filtered_data.xlsx");
  };

  const completeTask = state.datas.filter((item) => item.is_complete === true);
  const totalQuantity = completeTask.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const facebookRef = state.datas
    .filter((x) => x.reference === "facebook" && x.is_complete)
    .reduce((sum, x) => sum + (x.quantity || 0), 0);

  const referenceRef = state.datas
    .filter((x) => x.reference === "reference" && x.is_complete)
    .reduce((sum, x) => sum + (x.quantity || 0), 0);

  const bloackRef = state.datas
    .filter((x) => x.reference === "block" && x.is_complete)
    .reduce((sum, x) => sum + (x.quantity || 0), 0);

  const others = state.datas
    .filter(
      (x) =>
        x.is_complete &&
        x.reference != "block" &&
        x.reference != "facebook" &&
        x.reference != "reference"
    )
    .reduce((sum, x) => sum + (x.quantity || 0), 0);

  const handleInputChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const filterByMonth = () => {
    const { monthYear } = state;
    if (monthYear) {
      const [year, month] = monthYear.split("-");
      const filteredData = state.datas.filter((item) => {
        if (item.install_date) {
          const installDate = new Date(item.install_date);
          return (
            installDate.getFullYear() === parseInt(year) &&
            installDate.getMonth() + 1 === parseInt(month)
          );
        }
        return false;
      });

      setState((prev) => ({
        ...prev,
        datas: filteredData,
      }));
    }
  };

  return (
    <div className="h-full w-full bg-cyan-800  flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800  flex items-center justify-center text-white">
        <div className="flex-[4] flex justify-center items-center gap-2 text-black">
          <button className="bg-white h-[35px] w-[65px] text-black rounded ml-3">
            <Link href="/facebook">Back</Link>
          </button>
          <input
            type="date"
            name="startDate"
            value={state.startDate}
            onChange={handleDateChange}
            className="border rounded px-1 py-1"
          />
          <input
            type="date"
            name="endDate"
            value={state.endDate}
            onChange={handleDateChange}
            className="border rounded p-1"
          />
          <button
            onClick={filterByDate}
            className="text-white px-2 py-1.5 rounded bg-red-500"
          >
            GO
          </button>
          <input
            type="month"
            name="monthYear"
            value={state.monthYear}
            onChange={handleInputChange}
            className="border rounded p-1"
            placeholder="select month"
          />
          <button
            onClick={filterByMonth}
            className="text-white py-1 px-2 rounded bg-green-500"
          >
            GO
          </button>
        </div>
        <div className="text-[14px] gap-4 ml-2 h-full w-1/6 flex items-center justify-center text-white">
          <div>
            <p>
              Facebook:<strong className="ml-3">{facebookRef}</strong>
            </p>
            <p>
              Reference:<strong className="ml-3">{referenceRef}</strong>
            </p>
          </div>
          <div>
            <p>
              Block list:<strong className="ml-3">{bloackRef}</strong>
            </p>
            <p>
              others:<strong className="ml-3">{others}</strong>
            </p>
          </div>
        </div>
        <div className="flex-[4] flex items-center justify-end lg:mr-10 mr-4 gap-2">
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white p-2 rounded font-bold"
          >
            <HiOutlineDownload />
          </button>
          <p className="bg-red-600 text-white px-4 py-1 rounded font-bold">
            {totalQuantity}
          </p>
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
        <div className="h-[98%] w-[99%] shadow-2xl bg-white rounded-md">
          <div className="w-full flex bg-cyan-900 text-white uppercase">
            <div className="w-[80%] lg:flex lg:flex-[1] lg:gap-2 p-3 hidden">
              <p style={{ flex: 1, fontSize: 12 }}>Customer Name</p>
              <p style={{ flex: 1, fontSize: 12 }}>Customer No</p>
              <p style={{ flex: 1, fontSize: 12 }}>District</p>
              <p style={{ flex: 1, fontSize: 12 }}>Address</p>
              <p style={{ flex: 1, fontSize: 12 }}>Device_Price</p>
              <p style={{ flex: 1, fontSize: 12 }}>Service Charge</p>
              <p style={{ flex: 1, fontSize: 12 }}>Reference</p>
              <p style={{ flex: 1, fontSize: 12 }}>Install_Date</p>
              <p style={{ flex: 1, fontSize: 12 }}>Comments</p>
            </div>
            <p className="w-[20%] hidden lg:flex text-[12px] lg:items-center lg:justify-center">
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
