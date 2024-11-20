import React from "react";
import DeleteItem from "@/components/DeleteItem";

const DeleteService = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`${process.env.URL}/api/service-check/${id}`);
  const data = await response.json();

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <DeleteItem data={data} />
    </div>
  );
};

export default DeleteService;
