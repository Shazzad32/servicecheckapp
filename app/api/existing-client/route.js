import { connectToDb } from "@/utils/database";
import ExistingClient from "@/models/existing_client";

export const GET = async () => {
  try {
    await connectToDb();

    const data = await ExistingClient.find();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const POST = async (req) => {
  let {
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

  try {
    await connectToDb();

    const newexistingClient = new ExistingClient({
      device_id,
      device_phone,
      customer_phone,
      probabel_call_date,
      comments,
      state,
      after_state,
      platform,
      is_complete,
    });

    await newexistingClient.save();

    return new Response(JSON.stringify(newexistingClient), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
