import React from "react";
import NumberForm from "@/components/NumberForm";

const UpdateNumber = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(`${process.env.URL}/api/number/${id}`);
  const data = await response.json();

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center p-2">
      <p className="text-sm font-bold uppercase text-orange-400 md:text-3xl">
        Update Number
      </p>
      <NumberForm defaultNumber={data} isUpdate={true} />
    </div>
  );
};

export default UpdateNumber;
