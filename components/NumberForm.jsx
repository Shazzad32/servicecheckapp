"use client";
import { Autocomplete, TextField, Switch, Button } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NumberForm = ({ defaultNumber, isUpdate }) => {
  const router = useRouter();
  const [number, setNumber] = useState({
    ...defaultNumber,
  });

  const saveNumber = async () => {
    const res = await fetch("/api/number", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(number),
    });

    if (res.ok) {
      router.push("/sim");
    } else {
      throw new Error("Failed to save data");
    }
  };

  const updateNumber = async () => {
    console.log("ddd", number);
    const res = await fetch(`/api/number/${number._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(number),
    });

    if (!res.ok) {
      throw new Error("Failed to update topic");
    }
    router.push("/sim");
  };

  const handleChange = (e) => {
    setNumber({ ...number, [e.target.name]: e.target.value });
  };

  //   const handleAutocompleteChange = (name, newValue) => {
  //     setNumber((prevUser) => ({
  //       ...prevUser,
  //       [name]: newValue,
  //     }));
  //   };

  return (
    <div className="w-full  flex flex-col items-center justify-center gap-2 p-1 lg:p-6 lg:w-[50%] lg:gap-4">
      <TextField
        type="text"
        name="number"
        value={number.number || ""}
        onChange={handleChange}
        label="Number"
        fullWidth
      />
      <TextField
        type="date"
        name="active_date"
        value={number.active_date || ""}
        onChange={handleChange}
        label="Active Date"
        fullWidth
      />
      <div className="flex w-full justify-end gap-4">
        <Button variant="outlined">
          <Link href="/sim">Cancel</Link>
        </Button>
        <Button
          onClick={isUpdate ? updateNumber : saveNumber}
          variant="outlined"
        >
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default NumberForm;
