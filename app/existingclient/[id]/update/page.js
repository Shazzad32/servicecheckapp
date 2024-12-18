import React from "react";
import ExistingClientForm from "@/components/ExistingClientForm";

const UpdateUser = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(`${process.env.URL}/api/existing-client/${id}`);
  const data = await response.json();

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:w-full">
      <p className="text-sm font-bold uppercase text-orange-400 md:text-3xl">
        Update User
      </p>
      <ExistingClientForm defaultClientInfo={data} isUpdate={true} />
    </div>
  );
};

export default UpdateUser;
