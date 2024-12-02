import React from "react";
import TechnicianForm from "@/components/TechnicianForm";

const defaultTechItem = {
  tech_name: "",
  tech_phone: "",
  address: "",
  district: "",
};

const AddTechnician = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-2 gap-8 sm:gap-4">
      <p className="text-orange-500 uppercase text-3xl font-bold">
        Add New Technician
      </p>

      <TechnicianForm defaultTechItem={defaultTechItem} isUpdate={false} />
    </div>
  );
};

export default AddTechnician;
