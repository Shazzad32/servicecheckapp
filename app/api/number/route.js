import { connectToDb } from "@/utils/database";
import Number from "@/models/number";

// export const GET = async () => {
//   try {
//     await connectToDb();

//     const data = await Number.find();
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (error) {
//     return new Response(error.message, { status: 500 });
//   }
// };

// export const POST = async (req) => {
//   let { number, date } = await req.json();

//   try {
//     await connectToDb();
//     const newNumber = new Number({
//       number,
//       date,
//     });

//     await newNumber.save();

//     return new Response(JSON.stringify(newNumber), { status: 201 });
//   } catch (error) {
//     return new Response(error.message, { status: 500 });
//   }
// };

// export const PUT = async (req) => {
//   try {
//     const item = await req.json(); // Get the entire item object

//     if (!item._id) {
//       return new Response("ID is required", { status: 400 });
//     }

//     await connectToDb();
//     const updateNumber = await Number.findByIdAndUpdate(item._id, item, {
//       new: true,
//     });

//     if (!updateNumber) {
//       return new Response("Document not found", { status: 404 });
//     }

//     return new Response(JSON.stringify(updateNumber), { status: 200 });
//   } catch (error) {
//     console.log("Error in PUT request:", error);
//     return new Response(error.message, { status: 500 });
//   }
// };

// // export const DELETE = async (req) => {
// //   try {
// //     const { id } = await req.json();
// //     if (!id) {
// //       return new Response("ID is required", { status: 400 });
// //     }
// //     await connectToDb();
// //     const deletedServiceCheck = await ServiceCheck.findByIdAndDelete(id);

// //     if (!deletedServiceCheck) {
// //       return new Response("Document not found", { status: 404 });
// //     }
// //     return new Response("Document deleted successfully", { status: 200 });
// //   } catch (error) {
// //     console.log("Error in DELETE request:", error);
// //     return new Response(error.message, { status: 500 });
// //   }
// // };
