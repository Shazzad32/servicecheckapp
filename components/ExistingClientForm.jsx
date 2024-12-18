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
} from "@mui/material";
import React, { useState } from "react";
import districtOptions from "@/data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Textarea from "@mui/joy/Textarea";

const ExistingClientForm = ({ defaultClientInfo, isUpdate }) => {
  const STATE = ["receive", "not_receive", "off", "wrong"];
  const AFTER_STATE = ["Pending", "Agree"];
  const PLATFORM = ["RETAIL", "RANGS"];

  const router = useRouter();
  const [client, setClient] = useState({
    ...defaultClientInfo,
  });

  const saveClient = async () => {
    const res = await fetch("/api/existing-client", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (res.ok) {
      router.push("/existingclient");
    } else {
      throw new Error("Failed to save data");
    }
  };

  const updateClient = async () => {
    const res = await fetch(`/api/existing-client/${client._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (!res.ok) {
      throw new Error("Failed to update topic");
    }
    router.push("/existingclient");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (name, newValue) => {
    setClient((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };

  const handleSwitchChange = (name) => {
    setClient((prevValue) => ({
      ...prevValue,
      [name]: !prevValue[name],
    }));
  };
  const onStatusChange = (e) => {
    setClient((old) => ({ ...old, state: e.target.value }));
  };
  const onAfterStateChange = (e) => {
    setClient((old) => ({ ...old, after_state: e.target.value }));
  };
  const onPlatformChange = (e) => {
    setClient((old) => ({ ...old, platform: e.target.value }));
  };

  return (
    <div className="w-full  flex flex-col items-center justify-center gap-2 p-1 lg:p-6 lg:w-[50%] lg:gap-4">
      <TextField
        type="text"
        name="device_id"
        value={client.device_id || ""}
        onChange={handleChange}
        label="Device Id"
        fullWidth
      />

      <TextField
        type="text"
        name="device_phone"
        value={client.device_phone || ""}
        onChange={handleChange}
        label="Device Number"
        fullWidth
      />
      <TextField
        type="text"
        name="customer_phone"
        value={client.customer_phone || ""}
        onChange={handleChange}
        label="Customer Number"
        fullWidth
      />

      {/* <Autocomplete
        fullWidth
        options={districtOptions}
        value={user.district || ""}
        onChange={(e, newValue) =>
          handleAutocompleteChange("district", newValue)
        }
        renderInput={(params) => (
          <TextField {...params} label="District Name" />
        )}
      /> */}

      <div className="w-full flex justify-between gap-4">
        <FormControl className="w-[50%]">
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={client.state || ""}
            label="State"
            onChange={onStatusChange}
          >
            {STATE.map((x, i) => (
              <MenuItem key={i} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="w-[50%]">
          <InputLabel id="demo-simple-select-label">After State</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={client.after_state || ""}
            label="After State"
            onChange={onAfterStateChange}
          >
            {AFTER_STATE.map((x, i) => (
              <MenuItem key={i} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="w-full flex gap-4">
        {/* <FormControl className="w-[50%]">
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user.state || ""}
            label="State"
            onChange={onStatusChange}
          >
            {STATE.map((x, i) => (
              <MenuItem key={i} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-[50%]"
            label="Probabal Call Date"
            name="probabel_call_date"
            value={
              client.probabel_call_date
                ? dayjs(client.probabel_call_date)
                : null
            }
            onChange={(newValue) => {
              handleChange({
                target: {
                  name: "probabel_call_date",
                  value: newValue ? newValue.toISOString() : "", // Use ISO format
                },
              });
            }}
          />
        </LocalizationProvider>
        <FormControl className="w-[50%]">
          <InputLabel id="demo-simple-select-label">Platform</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={client.platform || ""}
            label="Platform"
            onChange={onPlatformChange}
          >
            {PLATFORM.map((x, i) => (
              <MenuItem key={i} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <p
        style={{
          width: "50%",
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
            value={client.is_complete}
            name="is_complete"
            onChange={() => handleSwitchChange("is_complete")}
            checked={client.is_complete}
          />
        }
      </p>
      <Textarea
        type="text"
        name="comments"
        value={client.comments || ""}
        onChange={handleChange}
        label="Comments"
        placeholder="Type Here..."
        minRows={5}
        className="w-full"
      />
      <div className="flex w-full justify-end gap-4">
        <Button variant="outlined">
          <Link href="/existingclient">Cancel</Link>
        </Button>
        <Button
          onClick={isUpdate ? updateClient : saveClient}
          variant="outlined"
        >
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default ExistingClientForm;
