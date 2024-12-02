import { connectToDb } from "/utils/database";
import User from "/models/user";

import mongoose from "mongoose";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDb();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response("Invalid user ID", { status: 400 });
    }
    const newUser = await User.findOne({ _id: id });
    if (newUser) {
      return new Response(JSON.stringify(newUser), { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Internal Server Error: " + error.message, {
      status: 500,
    });
  }
};

export const PUT = async (req, { params }) => {
  try {
    let { id } = await params;

    const {
      customer_name,
      customer_phone,
      district,
      address,
      insert_date,
      probabel_install_date,
      commnets,
      state,
      is_complete,
    } = await req.json();

    const newUser = await User.findOne({ _id: id });
    newUser.customer_name = customer_name;
    newUser.customer_phone = customer_phone;
    newUser.district = district;
    newUser.address = address;
    newUser.insert_date = insert_date;
    newUser.probabel_install_date = probabel_install_date;
    newUser.commnets = commnets;
    newUser.state = state;
    newUser.is_complete = is_complete;

    await newUser.save();

    return new Response("newUser add successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDb();
    const deleteItem = await User.findByIdAndDelete(id);
    if (!deleteItem) {
      return NextResponse(error.message, { status: 500 });
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
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
