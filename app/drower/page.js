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

  return (
    <div className="absulate">
      {/* Toggle Button */}
      <button
        onClick={toggleDrawer}
        className="text-2xl p-2 focus:outline-none"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Drawer Menu</h2>
          <Button variant="contained" component={Link} href="/servicecheck">
            <Link href={"/servicecheck"}>Service</Link>
          </Button>
        </div>
      </div>
      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50"
        ></div>
      )}
    </div>
  );
};

export default Drawer;
