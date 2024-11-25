import { connectToDb } from "@/utils/database";
import ServiceCheck from "@/models/service_check";

export const GET = async () => {
  try {
    await connectToDb();

    const data = await ServiceCheck.find();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const POST = async (req) => {
  let {
    device_id,
    reg_no,
    customer_number,
    address,
    district,
    problems,
    probable_install_date,
  } = await req.json();

  try {
    await connectToDb();

    const serviceCheck = new ServiceCheck({
      device_id,
      reg_no,
      customer_number,
      address,
      district,
      problems,
      probable_install_date,
    });

    await serviceCheck.save();

    return new Response(JSON.stringify(serviceCheck), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
