"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Search = ({ initialData = [] }) => {
  const [state, setState] = useState({
    datas: initialData,
    dataResults: initialData,
    searchItem: "",
  });

  const searchText = (e) => {
    let searchTxt = e.target.value.toLowerCase();
    let old = { ...state };
    if (searchTxt === "") {
      old.datas = [...old.dataResults];
    } else {
      old.datas = [...old.dataResults].filter((x) => {
        console.log("x data is", x);
        return (
          (x.device_id &&
            x.device_id.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.insert_date &&
            x.insert_date.toLowerCase().includes(searchTxt.toLowerCase()))
        );
      });
    }
    old.searchItem = searchTxt;
    setState(old);
  };
  return (
    <div>
      <input
        type="search"
        className="rounded-md border border-gray-200 py-[9px] p-4 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Search..."
        value={state.searchItem}
        onChange={searchText}
      />
    </div>
  );
};

export default Search;
