"use client";
import { Autocomplete, TextField, Switch, Button } from "@mui/material";
import React, { useState } from "react";
import districtOptions from "@/data";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const TechnicianForm = ({ defaultTechItem, isUpdate }) => {
  const router = useRouter();
  const [techItem, setTechItem] = useState({
    ...defaultTechItem,
  });

  console.log(techItem, "..ddd");

  const saveTechnician = async () => {
    const res = await fetch("/api/technician", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(techItem),
    });

    if (res.ok) {
      router.push("/technician");
    } else {
      throw new Error("Failed to save data");
    }
  };

  const updateTechnician = async () => {
    console.log("ddd", techItem);
    const res = await fetch(`/api/technician/${techItem._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(techItem),
    });

    if (!res.ok) {
      throw new Error("Failed to update topic");
    }
    router.push("/technician");
  };

  const handleChange = (e) => {
    setTechItem({ ...techItem, [e.target.name]: e.target.value });
  };
  const handleAutocompleteChange = (name, newValue) => {
    setTechItem((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };

  return (
    <div className="w-full  flex flex-col items-center justify-center gap-2 p-1 lg:p-6 lg:w-[50%] lg:gap-4">
      <TextField
        type="text"
        name="tech_name"
        value={techItem.tech_name || ""}
        onChange={handleChange}
        label="Technician Name"
        fullWidth
      />
      <TextField
        type="number"
        name="tech_phone"
        value={techItem.tech_phone || ""}
        onChange={handleChange}
        label="Technician Number"
        fullWidth
      />

      <Autocomplete
        fullWidth
        options={districtOptions}
        value={techItem.district || ""}
        onChange={(e, newValue) =>
          handleAutocompleteChange("district", newValue)
        }
        renderInput={(params) => <TextField {...params} label="District" />}
      />
      <TextField
        type="text"
        name="address"
        value={techItem.address || ""}
        onChange={handleChange}
        label="Address"
        fullWidth
      />
      <div className="flex w-full justify-end gap-4">
        <Button variant="outlined">
          <Link href="/technician">Cancel</Link>
        </Button>
        <Button
          onClick={isUpdate ? updateTechnician : saveTechnician}
          variant="outlined"
        >
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default TechnicianForm;
