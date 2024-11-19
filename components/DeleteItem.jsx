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
      const res = await fetch(
        `http://localhost:3000/api/service-check/${(data, data._id)}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        router.refresh();
      }
    }
    router.push("/servicecheck");
  };

  return (
    <div className="h-[150px]  w-2/6 bg-gray-300 flex flex-col p-4 rounded-md">
      <div className="h-[70%] w-full text-xl uppercase">
        Do you want to delete ?
        <span className="text-red-600 font-bold ml-2">
          {serviceCheck.device_id}
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
