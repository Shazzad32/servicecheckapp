import React from "react";
import TechnicianForm from "@/components/TechnicianForm";

const UpdateTech = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(`${process.env.URL}/api/technician/${id}`);
  const data = await response.json();

  console.log(data);
  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:w-full">
      <p className="text-sm font-bold uppercase text-orange-400 md:text-3xl">
        Update Technician Tnformation
      </p>
      <TechnicianForm defaultTechItem={data} isUpdate={true} />
    </div>
  );
};

export default UpdateTech;
