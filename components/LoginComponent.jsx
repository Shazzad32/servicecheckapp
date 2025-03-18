"use client";
import { Button, InputAdornment, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

const LoginComponent = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "forbit" && password === "forbit4321") {
      onLogin();
    } else {
      alert("Incurrect username or password");
    }
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <div className="h-[50%] w-[95%] lg:h-[70%] lg:w-[50%] shadow-2xl flex flex-col items-center justify-center gap-8">
        <h2 className="text-xl uppercase">LOG IN Page</h2>
        <TextField
          label="User Name"
          type="text"
          value={username}
          style={{ width: "75%" }}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {<AccountBoxOutlinedIcon />}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className="password"
          label="Password"
          type="password"
          value={password}
          style={{ width: "75%" }}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {<LockOutlinedIcon />}
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="button"
          onClick={handleLogin}
          style={{
            width: "75%",
            height: 45,
            background: "#3887BE",
            color: "white",
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginComponent;
