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
import Textarea from "@mui/joy/Textarea";

const FacebookForm = ({ defaultUser, isUpdate }) => {
  const router = useRouter();
  const [user, setUser] = useState({
    ...defaultUser,
  });

  console.log(user, "..ddd");

  const saveUser = async () => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      router.push("/facebook");
    } else {
      throw new Error("Failed to save data");
    }
  };

  const updateUser = async () => {
    console.log("ddd", user);
    const res = await fetch(`/api/user/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error("Failed to update topic");
    }
    router.push("/facebook");
  };

  // const handleChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (name, newValue) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };

  const handleSwitchChange = (name) => {
    setUser((prevValue) => ({
      ...prevValue,
      [name]: !prevValue[name],
    }));
  };

  return (
    <div className="w-full  flex flex-col items-center justify-center gap-2 p-1 lg:p-6 lg:w-[50%] lg:gap-4">
      <TextField
        type="text"
        name="customer_name"
        value={user.customer_name || ""}
        onChange={handleChange}
        label="Customer Name"
        fullWidth
      />
      <TextField
        type="number"
        name="customer_phone"
        value={user.customer_phone || ""}
        onChange={handleChange}
        label="Customer Phoner"
        fullWidth
      />

      <Autocomplete
        fullWidth
        options={districtOptions}
        value={user.district || ""}
        onChange={(e, newValue) =>
          handleAutocompleteChange("district", newValue)
        }
        renderInput={(params) => <TextField {...params} label="District" />}
      />
      <TextField
        type="text"
        name="address"
        value={user.address || ""}
        onChange={handleChange}
        label="Address"
        fullWidth
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="w-full"
          label="Probabal Install Date"
          name="probabel_install_date"
          value={
            user.probabel_install_date
              ? dayjs(user.probabel_install_date)
              : null
          }
          onChange={(newValue) => {
            handleChange({
              target: {
                name: "probabel_install_date",
                value: newValue ? newValue.toISOString() : "", // Use ISO format
              },
            });
          }}
        />
      </LocalizationProvider>
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
              value={user.is_complete}
              name="is_complete"
              onChange={() => handleSwitchChange("is_complete")}
              checked={user.is_complete}
            />
          }
        </p>
      )}
      {/* <Textarea
        type="text"
        name="problems"
        value={facebookinfo.comments || ""}
        onChange={handleChange}
        label="Description"
        placeholder="Enter your description"
        className="w-full border-black"
      /> */}

      <Textarea
        type="text"
        name="commnets"
        value={user.commnets || ""}
        onChange={handleChange}
        label="commnets"
        placeholder="Type Here..."
        minRows={2}
        className="w-full"
      />
      <div className="flex w-full justify-end gap-4">
        <Button variant="outlined">
          <Link href="/facebook">Cancel</Link>
        </Button>
        <Button onClick={isUpdate ? updateUser : saveUser} variant="outlined">
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default FacebookForm;
