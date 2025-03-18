"use client";
import {
  Autocomplete,
  TextField,
  Switch,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import React, { use, useState } from "react";
import districtOptions from "@/data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Textarea from "@mui/joy/Textarea";

const FacebookForm = ({ defaultUser, isUpdate }) => {
  const STATUS = ["AGREE", "PENDING", "BLOCKED"];
  const REF = ["facebook", "reference", "block"];
  const router = useRouter();

  const [errors, setErrors] = useState({
    reference: "",
  });

  const [user, setUser] = useState({
    ...defaultUser,
  });

  const validateFields = () => {
    let newErrors = {};
    if (user.is_complete) {
      if (!user.reference) {
        newErrors.reference = "Price required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (!validateFields()) return;

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

  const onStatusChange = (e) => {
    setUser((old) => ({ ...old, state: e.target.value }));
  };
  const onRefChange = (e) => {
    setUser((old) => ({ ...old, reference: e.target.value }));
  };

  return (
    <div className="w-full  flex flex-col items-center justify-center gap-2 p-1 lg:p-6 lg:w-[50%] lg:gap-4">
      <div className="w-full flex gap-4">
        <TextField
          className="w-[50%]"
          type="text"
          name="customer_name"
          value={user.customer_name || ""}
          onChange={handleChange}
          label="Customer Name"
        />
        <TextField
          className="w-[50%]"
          type="text"
          name="customer_phone"
          value={user.customer_phone || ""}
          onChange={handleChange}
          label="Customer Number"
        />
      </div>

      <div className="w-full flex gap-4">
        <Autocomplete
          className="w-[50%]"
          fullWidth
          options={districtOptions}
          value={user.district || ""}
          onChange={(e, newValue) =>
            handleAutocompleteChange("district", newValue)
          }
          renderInput={(params) => (
            <TextField {...params} label="District Name" />
          )}
        />
        <TextField
          type="text"
          name="address"
          value={user.address || ""}
          onChange={handleChange}
          label="Address"
          className="w-[50%]"
        />
      </div>
      <div className="w-full flex justify-between">
        <TextField
          className="w-[49%]"
          type="number"
          name="device_price"
          value={user.device_price || ""}
          onChange={handleChange}
          label="Device Price"
        />
        <TextField
          className="w-[49%]"
          type="number"
          name="service_charge"
          value={user.service_charge || ""}
          onChange={handleChange}
          label="Service Charge"
        />
      </div>

      <div className="w-full flex gap-4">
        {" "}
        <FormControl className="w-[50%]">
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user.state || ""}
            label="State"
            onChange={onStatusChange}
          >
            {STATUS.map((x, i) => (
              <MenuItem key={i} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-[50%]"
            label="probable Install Date"
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
      </div>

      {isUpdate && (
        <div className="w-full flex ">
          <p className="w-[20%] float-left">
            DONE
            {
              <Switch
                value={user.is_complete || ""}
                name="is_complete"
                onChange={() => handleSwitchChange("is_complete")}
                checked={user.is_complete || ""}
              />
            }
          </p>
          {user.is_complete && (
            <div className="w-[80%] flex gap-4 float-left">
              {/* <FormControl className="w-[50%]">
              <InputLabel id="demo-simple-select-label">Reference</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user.reference || ""}
                label="Reference"
                onChange={onRefChange}
                error={!!errors.reference}
                helperText={errors.reference}
              >
                {REF.map((x, i) => (
                  <MenuItem key={i} value={x}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
              <FormControl className="w-[50%]" error={!!errors.reference}>
                <InputLabel id="demo-simple-select-label">Reference</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user.reference || ""}
                  onChange={onRefChange}
                >
                  {REF.map((x, i) => (
                    <MenuItem key={i} value={x}>
                      {x}
                    </MenuItem>
                  ))}
                </Select>
                {errors.reference && (
                  <FormHelperText>{errors.reference}</FormHelperText>
                )}
              </FormControl>

              <TextField
                className="w-[50%]"
                label="Quantity"
                type="number"
                name="quantity"
                value={user.quantity}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      )}

      <Textarea
        type="text"
        name="comments"
        value={user.comments || ""}
        onChange={handleChange}
        label="Comments"
        placeholder="Type Here..."
        minRows={5}
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
