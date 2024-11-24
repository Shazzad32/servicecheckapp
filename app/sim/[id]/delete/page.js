import React from "react";
import Deletenumber from "@/components/Deletenumber";

const DeleteNumber = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`${process.env.URL}/api/number/${id}`);
  const data = await response.json();

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Deletenumber data={data} />
    </div>
  );
};

export default DeleteNumber;
