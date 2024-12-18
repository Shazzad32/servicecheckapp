import React from "react";
import DeleteClient from "@/components/DeleteClient";

const ClientDelete = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`${process.env.URL}/api/existing-client/${id}`);
  const data = await response.json();

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <DeleteClient data={data} />
    </div>
  );
};

export default ClientDelete;
