"use client";
import { Autocomplete, TextField, Switch, Button } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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

      <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
        <DatePicker
          className="w-full"
          label="Active Date"
          name="active_date"
          value={number.active_date ? dayjs(number.active_date) : null} // Ensure Day.js object or null
          onChange={(newValue) => {
            handleChange({
              target: {
                name: "active_date",
                value: newValue ? newValue.format("YYYY-MM-DD") : "", // Convert to string for state
              },
            });
            fullWidth;
          }}
        />
      </LocalizationProvider>
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
