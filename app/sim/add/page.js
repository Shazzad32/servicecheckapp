import React from "react";
import NumberForm from "@/components/NumberForm";

const defaultNumber = {
  number: "",
  kcp_number: "",
  active_date: "",
};

const AddNumber = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center p-2 gap-8 sm:gap-4">
      <div className="text-sm font-bold uppercase text-orange-400 md:text-3xl">
        Add New Number
      </div>
      <NumberForm defaultNumber={defaultNumber} isUpdate={false} />
    </div>
  );
};

export default AddNumber;
