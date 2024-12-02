import DeleteTechItem from "@/components/DeleteTechItem";
import Search from "@/components/Search";
import React from "react";

const DeleteTech = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`${process.env.URL}/api/technician/${id}`);
  const data = await response.json();

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <DeleteTechItem data={data} />
    </div>
  );
};

export default DeleteTech;
