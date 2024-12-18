import { connectToDb } from "@/utils/database";
import ExistingClient from "@/models/existing_client";

export const GET = async (req, { params }) => {
  let { id } = await params;

  try {
    await connectToDb();

    const newExistingClient = await ExistingClient.findOne({ _id: id });

    if (newExistingClient) {
      return new Response(JSON.stringify(newExistingClient), { status: 200 });
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

    const {
      device_id,
      device_phone,
      customer_phone,
      probabel_call_date,
      comments,
      state,
      after_state,
      platform,
      is_complete,
    } = await req.json();

    const newExistingClient = await ExistingClient.findOne({ _id: id });
    newExistingClient.device_id = device_id;
    newExistingClient.device_phone = device_phone;
    newExistingClient.customer_phone = customer_phone;
    newExistingClient.probabel_call_date = probabel_call_date;
    newExistingClient.comments = comments;
    newExistingClient.state = state;
    newExistingClient.after_state = after_state;
    newExistingClient.platform = platform;
    newExistingClient.is_complete = is_complete;

    await newExistingClient.save();

    return new Response("ExistingClient successfully Update", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDb();
    const deleteItem = await ExistingClient.findByIdAndDelete(id);
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
