"use client";
import { Autocomplete, TextField, Switch, Button } from "@mui/material";
import React, { useState } from "react";
import districtOptions from "@/data";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ServiceForm = ({ defaultServiceCheck, isUpdate }) => {
  const router = useRouter();
  const [serviceCheck, setServiceCheck] = useState({
    ...defaultServiceCheck,
  });

  const saveServiceCheck = async () => {
    const res = await fetch("/api/service-check", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(serviceCheck),
    });

    if (res.ok) {
      router.push("/servicecheck");
    } else {
      throw new Error("Failed to save data");
    }
  };

  const updateServiceCheck = async () => {
    console.log("ddd", serviceCheck);
    const res = await fetch(`/api/service-check/${serviceCheck._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(serviceCheck),
    });

    if (!res.ok) {
      throw new Error("Failed to update topic");
    }
    router.push("/servicecheck");
  };

  const handleChange = (e) => {
    setServiceCheck({ ...serviceCheck, [e.target.name]: e.target.value });
  };

  const handleAutocompleteChange = (name, newValue) => {
    setServiceCheck((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };

  const handleSwitchChange = (name) => {
    setServiceCheck((prevValue) => ({
      ...prevValue,
      [name]: !prevValue[name],
    }));
  };
  return (
    <div className="w-full  flex flex-col items-center justify-center gap-2 p-1 lg:p-6 lg:w-[50%] lg:gap-4">
      <TextField
        type="text"
        name="device_id"
        value={serviceCheck.device_id || ""}
        onChange={handleChange}
        label="Device Id"
        fullWidth
      />
      <TextField
        type="text"
        name="reg_no"
        value={serviceCheck.reg_no || ""}
        onChange={handleChange}
        label="Reg Number"
        fullWidth
      />
      <TextField
        type="text"
        name="customer_number"
        value={serviceCheck.customer_number || ""}
        onChange={handleChange}
        label="Customer No"
        fullWidth
      />
      <Autocomplete
        fullWidth
        options={districtOptions}
        value={serviceCheck.district || ""}
        onChange={(e, newValue) =>
          handleAutocompleteChange("district", newValue)
        }
        renderInput={(params) => <TextField {...params} label="District" />}
      />
      <TextField
        type="text"
        name="address"
        value={serviceCheck.address || ""}
        onChange={handleChange}
        label="Address"
        fullWidth
      />
      <TextField
        type="text"
        name="problems"
        value={serviceCheck.problems || ""}
        onChange={handleChange}
        label="Problems"
        fullWidth
      />

      {isUpdate && (
        <p
          style={{
            width: "80%",
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
        >
          COMPLETE
          {
            <Switch
              value={serviceCheck.is_complete}
              name="is_complete"
              onChange={() => handleSwitchChange("is_complete")}
              checked={serviceCheck.is_complete}
            />
          }
        </p>
      )}

      <div className="flex w-full justify-end gap-4">
        <Button variant="outlined">
          <Link href="/servicecheck">Cancel</Link>
        </Button>
        <Button
          onClick={isUpdate ? updateServiceCheck : saveServiceCheck}
          variant="outlined"
        >
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default ServiceForm;
