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

// export const GET = async (req) => {
//   try {
//     await connectToDb();

//     const url = new URL(req.url);
//     const isActive = url.searchParams.get("is_active");

//     console.log("Query parameter:", isActive); // Debug log

//     let query = {};
//     if (isActive !== null) {
//       query.is_active = isActive === "true";
//     }

//     console.log("Database query:", query); // Debug log

//     const data = await ServiceCheck.find(query);
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: error.message }), {
//       status: 500,
//     });
//   }
// };

export const POST = async (req) => {
  let {
    device_id,
    reg_no,
    customer_number,
    address,
    district,
    problems,
    service_fee,
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
      service_fee,
      probable_install_date,
    });

    await serviceCheck.save();

    return new Response(JSON.stringify(serviceCheck), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
