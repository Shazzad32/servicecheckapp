"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@mui/material";

const DeleteItem = ({ data }) => {
  const router = useRouter();
  const serviceCheck = { ...data };
  const removeItem = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/service-check/${(data, data._id)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
    router.push("/servicecheck");
  };

  return (
    <div className="w-[90%] h-[15%] rounded-md text-sm shadow-md bg-slate-400 flex flex-col items-center justify-center gap-2 p-4 lg:p-2 lg:w-[30%] lg:h-[20%] lg:gap-2 lg:text-xl">
      <div className="h-[70%] w-full uppercase">
        Do you want to delete ?
        <span className="text-red-600 font-bold ml-2">
          {serviceCheck.device_id ? serviceCheck.device_id : "undefined"}
        </span>
      </div>
      <div className="h-[30%] w-full flex justify-end gap-2">
        <Button variant="outlined" onClick={removeItem}>
          yes
        </Button>
        <Button variant="outlined">
          <Link href={"/servicecheck"}>No</Link>
        </Button>
      </div>
    </div>
  );
};

export default DeleteItem;
