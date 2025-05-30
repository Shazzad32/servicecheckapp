"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@mui/material";

const DeleteNumber = ({ data }) => {
  const router = useRouter();
  const number = { ...data };
  const removeNumber = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/number/${(data, data._id)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
    router.push("/sim");
  };

  return (
    <div className="w-[90%] h-[15%] rounded-md text-sm shadow-md text-white bg-blue-300 flex flex-col items-center p-2 justify-center gap-2 lg:p-3 lg:w-[30%] lg:h-[20%] lg:gap-2 lg:text-xl">
      <div className="h-[70%] w-full uppercase">
        Do you want to delete ?
        <span className="text-red-600 font-bold ml-2">
          {number.number ? number.number : "undefined"}
        </span>
      </div>
      <div className="h-[30%] w-full flex justify-end gap-2">
        <Button variant="contained" onClick={removeNumber}>
          yes
        </Button>
        <Button variant="contained">
          <Link href={"/sim"}>No</Link>
        </Button>
      </div>
    </div>
  );
};

export default DeleteNumber;
