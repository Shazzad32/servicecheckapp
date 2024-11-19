import React from "react";
import ServiceForm from "@/components/ServiceForm";

const defaultServiceCheck = {
  device_id: "",
  reg_no: "",
  customer_number: "",
  address: "",
  district: "",
  problems: "",
  insert_date: "",
  is_complete: false,
};

const AddService = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 gap-8 sm:gap-4">
      <div className="text-sm font-bold uppercase text-orange-400 md:text-3xl">
        Create Service
      </div>
      <ServiceForm defaultServiceCheck={defaultServiceCheck} isUpdate={false} />
    </div>
  );
};

export default AddService;
