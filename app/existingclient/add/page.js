import ExistingClientForm from "@/components/ExistingClientForm";
import React from "react";

const defaultClientInfo = {
  device_id: "",
  device_phone: "",
  customer_phone: "",
  platform: "",
  state: "",
  after_state: "",
  comments: "",
  probabel_call_date: "",
};

const NewClient = () => {
  return (
    <div className="w-full h-2/3 flex flex-col justify-center items-center gap-8 sm:gap-4">
      <div className="h-[50%] w-[75%]  flex flex-col items-center justify-center">
        <p className="text-orange-500 uppercase text-3xl font-bold">
          Create User
        </p>
        <ExistingClientForm
          defaultClientInfo={defaultClientInfo}
          isUpdate={false}
        />
      </div>
    </div>
  );
};

export default NewClient;
