import React from "react";
import ServiceForm from "@/components/ServiceForm";

const UpdateService = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(`${process.env.URL}/api/service-check/${id}`);
  const data = await response.json();

  console.log(data);
  return (
    <div className="w-full flex flex-col items-center justify-center sm:w-full ">
      <p className="text-sm font-bold uppercase text-orange-400 md:text-3xl flex justify-center items-end">
        Update Service
      </p>{" "}
      <ServiceForm defaultServiceCheck={data} isUpdate={true} />
    </div>
  );
};

export default UpdateService;
