import { connectToDb } from "/utils/database";
import User from "/models/user";

export const GET = async (req, { params }) => {
  let { id } = await params;

  try {
    await connectToDb();

    const newUser = await User.findOne({ _id: id });

    if (newUser) {
      return new Response(JSON.stringify(newUser), { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  try {
    let { id } = await params;

    const {
      customer_name,
      customer_phone,
      address,
      district,
      state,
      device_price,
      service_charge,
      comments,
      insert_date,
      probabel_install_date,
      install_date,
      reference,
      quantity,
      is_complete,
    } = await req.json();

    const newUser = await User.findOne({ _id: id });
    newUser.customer_name = customer_name;
    newUser.customer_phone = customer_phone;
    newUser.address = address;
    newUser.district = district;
    newUser.insert_date = insert_date;
    newUser.comments = comments;
    newUser.state = state;
    newUser.service_charge = service_charge;
    newUser.device_price = device_price;
    newUser.probabel_install_date = probabel_install_date;
    newUser.install_date = install_date;
    newUser.reference = reference;
    newUser.quantity = quantity;
    newUser.is_complete = is_complete;

    await newUser.save();

    return new Response("User Update successfully", { status: 200 });
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
