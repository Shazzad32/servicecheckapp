import { connectToDb } from "@/utils/database";
import Number from "@/models/number";

export const GET = async () => {
  try {
    await connectToDb();

    const data = await Number.find();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const POST = async (req) => {
  let { number, active_date } = await req.json();

  try {
    await connectToDb();

    const newnumber = new Number({
      number,
      active_date,
    });

    await newnumber.save();

    return new Response(JSON.stringify(newnumber), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
