import { connectToDb } from "@/utils/database";
import User from "@/models/user";

export const GET = async () => {
  try {
    await connectToDb();

    const data = await User.find();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const POST = async (req) => {
  let {
    customer_name,
    customer_phone,
    district,
    address,
    probabel_install_date,
    install_date,
    comments,
    state,
  } = await req.json();

  try {
    await connectToDb();

    const newuser = new User({
      customer_name,
      customer_phone,
      district,
      address,
      probabel_install_date,
      install_date,
      comments,
      state,
    });

    await newuser.save();

    return new Response(JSON.stringify(newuser), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
