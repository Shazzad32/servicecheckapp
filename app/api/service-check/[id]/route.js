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
import ServiceCheck from "/models/service_check";

export const GET = async (req, { params }) => {
  let { id } = await params;
  // const id = req.url;
  // console.log(params);

  try {
    await connectToDb();

    const serviceCheck = await ServiceCheck.findOne({ _id: id });

    if (serviceCheck) {
      return new Response(JSON.stringify(serviceCheck), { status: 200 });
    } else {
      return new Response("Service Check not found", { status: 404 });
    }
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  try {
    let { id } = await params;

    const {
      device_id,
      reg_no,
      customer_number,
      address,
      district,
      problems,
      is_complete,
    } = await req.json();

    // console.log(device_id, id);

    // console.log(data);

    const serviceCheck = await ServiceCheck.findOne({ _id: id });
    serviceCheck.device_id = device_id;
    serviceCheck.reg_no = reg_no;
    serviceCheck.customer_number = customer_number;
    serviceCheck.address = address;
    serviceCheck.district = district;
    serviceCheck.problems = problems;
    serviceCheck.is_complete = is_complete;

    await serviceCheck.save();

    return new Response("SevviceCheck successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectToDb();
//   await Topic.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
// }

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDb();
    const deleteItem = await ServiceCheck.findByIdAndDelete(id);
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
