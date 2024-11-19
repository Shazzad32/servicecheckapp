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
  let { device_id, reg_no, customer_number, address, district, problems } =
    await req.json();

  try {
    await connectToDb();

    const serviceCheck = new ServiceCheck({
      device_id,
      reg_no,
      customer_number,
      address,
      district,
      problems,
    });

    await serviceCheck.save();

    // const data = await ServiceCheck.find();
    return new Response(JSON.stringify(serviceCheck), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

// export const PUT = async (req) => {
//   try {
//     const item = await req.json();

//     if (!item._id) {
//       return new Response("ID is required", { status: 400 });
//     }

//     await connectToDb();

//     const updatedServiceCheck = await ServiceCheck.findByIdAndUpdate(
//       item._id,
//       item,
//       { new: true }
//     );

//     if (!updatedServiceCheck) {
//       return new Response("Document not found", { status: 404 });
//     }

//     return new Response(JSON.stringify(updatedServiceCheck), { status: 200 });
//   } catch (error) {
//     console.error("Error in PUT request:", error);
//     return new Response(JSON.stringify({ message: error.message }), {
//       status: 500,
//     });
//   }
// };

// export const DELETE = async (req) => {
//   try {
//     const { id } = await req.json();
//     if (!id) {
//       return new Response("ID is required", { status: 400 });
//     }
//     await connectToDb();
//     const deletedServiceCheck = await ServiceCheck.findByIdAndDelete(id);

//     if (!deletedServiceCheck) {
//       return new Response("Document not found", { status: 404 });
//     }
//     return new Response("Document deleted successfully", { status: 200 });
//   } catch (error) {
//     console.log("Error in DELETE request:", error);
//     return new Response(error.message, { status: 500 });
//   }
// };
