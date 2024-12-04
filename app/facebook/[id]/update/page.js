import React from "react";
import FacebookForm from "@/components/FacebookForm";

const UpdateUser = async ({ params }) => {
  const { id } = await params;

  const response = await fetch(`${process.env.URL}/api/user/${id}`);
  const data = await response.json();

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:w-full">
      <p className="text-sm font-bold uppercase text-orange-400 md:text-3xl">
        Update User
      </p>
      <FacebookForm defaultUser={data} isUpdate={true} />
    </div>
  );
};

export default UpdateUser;
