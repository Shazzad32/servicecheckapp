import React from "react";
import FacebookForm from "@/components/FacebookForm";

const defaultUser = {
  customer_name: "",
  customer_phone: "",
  district: "",
  address: "",
  insert_date: "",
  install_date: "",
  probabel_install_date: "",
  comments: "",
  state: "",
};

const AddService = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-2 gap-8 sm:gap-4">
      <p className="text-orange-500 uppercase text-3xl font-bold">
        Create User
      </p>

      <FacebookForm defaultUser={defaultUser} isUpdate={false} />
    </div>
  );
};

export default AddService;
