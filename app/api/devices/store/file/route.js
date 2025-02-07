import { connectToDb } from "@/utils/database";
import { NextResponse } from "next/server";
import Device from "@/models/devices";

export const POST = async (req) => {
  try {
    await connectToDb();
    const devices = await req.json();

    const ids = devices.map((x) => x.device_id);

    const existingdevices = await Device.find({ device_id: { $in: ids } });

    if (existingdevices.length > 0) {
      return NextResponse.json(
        {
          message: "These Devices Already inserted",
          data: existingdevices.map((x) => x.device_id),
        },
        { status: 200 }
      );
    }

    const createdDEvices = await Device.create([...devices]);

    console.log(createdDEvices);

    return NextResponse.json(
      { message: "Devices added succussfully", data: createdDEvices },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding device:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500 }
    );
  }
};
