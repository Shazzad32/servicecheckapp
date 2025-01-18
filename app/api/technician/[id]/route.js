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
