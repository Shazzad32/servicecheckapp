"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { Button } from "@mui/material";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDrawer}
        className="text-2xl p-2 focus:outline-none fixed top-4 left-4 z-50 text-black"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-300 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-14 flex flex-col gap-2">
          <Button variant="contained" onClick={handleCloseDrawer}>
            <Link href="/servicecheck">Service</Link>
          </Button>
          <Button variant="contained" onClick={handleCloseDrawer}>
            <Link href="/facebook">Facebook</Link>
          </Button>
          <Button variant="contained" onClick={handleCloseDrawer}>
            <Link href="/existingclient">Existing</Link>
          </Button>
          <Button variant="contained" onClick={handleCloseDrawer}>
            <Link href="/technician">Technician</Link>
          </Button>
          <Button variant="contained" onClick={handleCloseDrawer}>
            <Link href="/sim">RobiSim</Link>
          </Button>
        </div>
      </div>
      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50 z-30"
        ></div>
      )}
    </div>
  );
};

export default Drawer;
