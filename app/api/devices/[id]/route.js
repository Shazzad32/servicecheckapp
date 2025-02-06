// import { connectToDb } from "/utils/database";
// import Devices from "/models/devices";

// export const GET = async (req, { params }) => {
//   let { id } = await params;

//   try {
//     await connectToDb();

//     const newDevice = await Devices.findOne({ _id: id });

//     if (newDevice) {
//       return new Response(JSON.stringify(newDevice), { status: 200 });
//     } else {
//       return new Response("Number not found", { status: 404 });
//     }
//   } catch (error) {
//     return new Response(error.message, { status: 500 });
//   }
// };

// export const PUT = async (req, { params }) => {
//   try {
//     let { id } = await params;

//     const {
//       device_id,
//       send_to,
//       from,
//       district,
//       device_type,
//       device_model,
//       issue_by,
//       sending_date,
//       install_date,
//       device_price,
//       is_complete,
//       insert_date,
//       workshop,
//     } = await req.json();

//     const newDevice = await Devices.findOne({ _id: id });
//     newDevice.device_id = device_id;
//     (newDevice.send_to = send_to),
//       (newDevice.district = district),
//       (newDevice.device_type = device_type),
//       (newDevice.device_model = device_model),
//       (newDevice.issue_by = issue_by),
//       (newDevice.workshop = workshop),
//       (newDevice.sending_date = sending_date),
//       (newDevice.install_date = install_date),
//       (newDevice.device_price = device_price),
//       (newDevice.is_complete = is_complete);
//     newDevice.from = from;
//     newDevice.insert_date = insert_date;

//     await newDevice.save();

//     return new Response("Update successfully", { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new Response(error.message, { status: 500 });
//   }
// };

// export async function DELETE(request, { params }) {
//   const { id } = params;

//   try {
//     await connectToDb();
//     const deleteItem = await Devices.findByIdAndDelete(id);
//     if (!deleteItem) {
//       return NextResponse(error.message, { status: 500 });
//     }
//     return NextResponse.json(
//       { message: "Item deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }



import { connectToDb } from "/utils/database";
import Devices from "/models/devices";

// GET: Fetch a single device by ID
export const GET = async (req, { params }) => {
  const { id } = params;

  if (!id) {
    return new Response("ID is required", { status: 400 });
  }

  try {
    await connectToDb();
    const device = await Devices.findOne({ _id: id });

    if (!device) {
      return new Response("Device not found", { status: 404 });
    }

    return new Response(JSON.stringify(device), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

// PUT: Update a device by ID
export const PUT = async (req, { params }) => {
  const { id } = params;

  if (!id) {
    return new Response("ID is required", { status: 400 });
  }

  try {
    const {
      device_id,
      send_to,
      from,
      district,
      device_type,
      device_model,
      issue_by,
      sending_date,
      install_date,
      device_price,
      is_complete,
      insert_date,
      workshop,
    } = await req.json();

    await connectToDb();
    const device = await Devices.findOne({ _id: id });

    if (!device) {
      return new Response("Device not found", { status: 404 });
    }

    // Update device fields
    device.device_id = device_id;
    device.send_to = send_to;
    device.from = from;
    device.district = district;
    device.device_type = device_type;
    device.device_model = device_model;
    device.issue_by = issue_by;
    device.sending_date = sending_date;
    device.install_date = install_date;
    device.device_price = device_price;
    device.is_complete = is_complete;
    device.insert_date = insert_date;
    device.workshop = workshop;

    await device.save();

    return new Response("Device updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating device:", error);
    return new Response(error.message, { status: 500 });
  }
};

// DELETE: Delete a device by ID
export const DELETE = async (req, { params }) => {
  const { id } = params;

  if (!id) {
    return new Response("ID is required", { status: 400 });
  }

  try {
    await connectToDb();
    const deletedDevice = await Devices.findByIdAndDelete(id);

    if (!deletedDevice) {
      return new Response("Device not found", { status: 404 });
    }

    return new Response("Device deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting device:", error);
    return new Response(error.message, { status: 500 });
  }
};