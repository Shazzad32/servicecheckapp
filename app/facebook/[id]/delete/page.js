import React from "react";
import DeleteUser from "@/components/DeleteUser";

const UserDelete = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`${process.env.URL}/api/user/${id}`);

  const data = await response.json();
  console.log(data, "tttttt");

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <DeleteUser />
      {/* <DeleteUser data={data} /> */}
    </div>
  );
};

export default UserDelete;
