import { connectToDb } from "/utils/database";
import Number from "/models/number";

export const GET = async (req, { params }) => {
  let { id } = await params;

  try {
    await connectToDb();

    const newNumber = await Number.findOne({ _id: id });

    if (newNumber) {
      return new Response(JSON.stringify(newNumber), { status: 200 });
    } else {
      return new Response("Number not found", { status: 404 });
    }
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  try {
    let { id } = await params;

    const { number, kcp_number, active_date, is_active } = await req.json();

    const newNumber = await Number.findOne({ _id: id });
    newNumber.number = number;
    newNumber.kcp_number = kcp_number;
    newNumber.active_date = active_date;
    newNumber.is_active = is_active;

    await newNumber.save();

    return new Response("number add successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDb();
    const deleteItem = await Number.findByIdAndDelete(id);
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
