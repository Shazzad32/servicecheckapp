"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import ServiceTable from "./ServiceTable";

const headers = [
  "Device ID",
  "Reg No",
  "Customer No",
  "District",
  "Address",
  "Service Fee",
  "Insert Date",
  "Pro Ins Date",
  "problems",
];

const ServiceInfo = ({ serviceinfo }) => {
  const [state, setState] = useState({
    datas: [...serviceinfo],
    dataResults: [...serviceinfo],
    search: "",
    nextday: false,
    selectedDate: null,
    open: false,
  });

  const complete = state.datas.filter(
    (item) => item.is_complete === true
  ).length;

  const dontcomplete = state.datas.filter(
    (item) => item.is_complete === false
  ).length;

  const notComplete = state.datas
    .filter((item) => item.is_complete === false)
    .sort((a, b) => new Date(b.insert_date) - new Date(a.insert_date));

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setState((prev) => ({
      ...prev,
      search: search,
    }));
  };

  useEffect(() => {
    let filterDEvices = [];

    if (state.search === "") {
      filterDEvices = [...serviceinfo];
    } else {
      filterDEvices = [...serviceinfo].filter(
        (x) =>
          x.device_id.toLowerCase().includes(state.search.toLowerCase()) ||
          x.district.toLowerCase().includes(state.search.toLowerCase()) ||
          x.reg_no.toLowerCase().includes(state.search.toLowerCase()) ||
          x.customer_number.toLowerCase().includes(state.search.toLowerCase())
      );
    }

    setState((prev) => ({
      ...prev,
      datas: [...filterDEvices],
    }));
  }, [state.search]);

  // const searchText = (e) => {
  //   let searchTxt = e.target.value.toLowerCase();
  //   console.log(searchTxt);
  //   let old = { ...state };
  //   if (searchTxt === "") {
  //     old.datas = [...old.dataResults];
  //   } else {
  //     old.datas = [...old.dataResults].filter((x) => {
  //       return (
  //         (x.device_id &&
  //           x.device_id.toLowerCase().includes(searchTxt.toLowerCase())) ||
  //         (x.district &&
  //           x.district.toLowerCase().includes(searchTxt.toLowerCase())) ||
  //         (x.address &&
  //           x.address.toLowerCase().includes(searchTxt.toLowerCase())) ||
  //         (x.reg_no &&
  //           x.reg_no.toLowerCase().includes(searchTxt.toLowerCase())) ||
  //         (x.problems &&
  //           x.problems.toLowerCase().includes(searchTxt.toLowerCase())) ||
  //         (x.insert_date &&
  //           String(x.insert_date)
  //             .toLowerCase()
  //             .includes(searchTxt.toLowerCase())) ||
  //         (x.customer_number &&
  //           x.customer_number.toLowerCase().includes(searchTxt.toLowerCase()))
  //       );
  //     });
  //   }
  //   old.searchItem = searchTxt;
  //   console.log(old.searchItem);
  //   setState(old);
  // };

  const onDateChange = (date) => {
    const selectedDate = new Date(date).setHours(0, 0, 0, 0);
    const filteredData = state.dataResults.filter((item) => {
      const itemDate = new Date(item.probable_install_date).setHours(
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
    <div className="h-full w-full flex flex-col items-center justify-center">
      <header className="h-[10vh] w-full bg-gray-700 flex items-center justify-between px-4 py-2">
        <div className="flex gap-4 lg:text-lg uppercase text-red-400">
          Service Check
          <span className="info-box text-white">
            Pending: <strong className="text-orange-300">{dontcomplete}</strong>
          </span>
          <Link href="/servicecheck/done" className="info-box text-white">
            Done: <strong className="text-orange-300">{complete}</strong>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="btn text-white">
            HOME
          </Link>
          <Link href="/servicecheck/add" className="btn text-white">
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
            className="h-[40px] px-4 rounded-md flex items-center justify-center text-black "
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
            {notComplete.map((item, i) => (
              <div
                key={i}
                className={`${i % 2 === 0 ? "bg-blue-100" : "bg-gray-300"}`}
              >
                <ServiceTable key={i} item={item} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceInfo;
