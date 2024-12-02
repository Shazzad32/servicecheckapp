// import { connectToDb } from "@utils/database";
// import Project from '@models/project';

// export const PUT = async (req, { params }) => {
//   let project_id = params.project_id;
//   let user_id = params.user_id;
//   let permission = await req.json();

//   try {
//     await connectToDb();
//     let project = await Project.findById(project_id);
//     project.shared_users.filter(
//       (x) => x.user.toString() === user_id
//     )[0].permission = permission;
//     // console.log(user, 'Old User');
//     // let newUser = { ...user };
//     // console.log(newUser, 'New User');
//     // newUser.permission = permission;
//     // project.shared_users[project.shared_users.indexOf(user)] = newUser;

//     await project.save();
//     return new Response('User updated successfully', { status: 200 });
//   } catch (error) {
//     return new Response(error.message, { status: 500 });
//   }
// };

// export const DELETE = async (req, { params }) => {
//   let user_id = params.user_id;
//   let project_id = params.project_id;

//   try {
//     await connectToDb();
//     let project = await Project.findById(project_id);
//     project.shared_users = [...project.shared_users].filter(
//       (x) => x.user.toString() !== user_id
//     );
//     await project.save();
//     return new Response('User deleted successfully', { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new Response(error.message, { status: 500 });
//   }
// };

import { connectToDb } from "/utils/database";
import Technician from "/models/technician";

export const GET = async (req, { params }) => {
  let { id } = await params;

  try {
    await connectToDb();

    const newTechnician = await Technician.findOne({ _id: id });

    if (newTechnician) {
      return new Response(JSON.stringify(newTechnician), { status: 200 });
    } else {
      return new Response("Technician not found", { status: 404 });
    }
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  try {
    let { id } = await params;

    const { tech_name, tech_phone, address, district } = await req.json();

    const newTechnician = await Technician.findOne({ _id: id });
    newTechnician.tech_name = tech_name;
    newTechnician.tech_phone = tech_phone;
    newTechnician.district = district;
    newTechnician.address = address;

    await newTechnician.save();

    return new Response("SevviceCheck successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDb();
    const deleteItem = await Technician.findByIdAndDelete(id);
    if (!deleteItem) {
      return NextResponse(error.message, { status: 500 });
    }
    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
