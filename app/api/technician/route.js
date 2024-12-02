import { connectToDb } from "@/utils/database";
import Technician from "@/models/technician";

export const GET = async () => {
  try {
    await connectToDb();

    const data = await Technician.find();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const POST = async (req) => {
  let { tech_name, tech_phone, district, address } = await req.json();

  try {
    await connectToDb();

    const newTechnician = new Technician({
      tech_name,
      tech_phone,
      district,
      address,
    });

    await newTechnician.save();

    return new Response(JSON.stringify(newTechnician), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
