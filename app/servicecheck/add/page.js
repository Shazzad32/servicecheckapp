import React from "react";
import ServiceForm from "@/components/ServiceForm";

const defaultServiceCheck = {
  device_id: "",
  reg_no: "",
  customer_number: "",
  address: "",
  district: "",
  problems: "",
  service_fee: "0",
  probable_install_date: "",
};

const AddService = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-2 gap-8 sm:gap-4">
      <p className="text-orange-500 uppercase text-3xl font-bold">
        Create Service
      </p>

      <ServiceForm defaultServiceCheck={defaultServiceCheck} isUpdate={false} />
    </div>
  );
};

export default AddService;
