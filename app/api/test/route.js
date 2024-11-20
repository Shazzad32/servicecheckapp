export const GET = async () => {
  return new Response(
    JSON.stringify({
      URL: process.env.URL,
      MONGODB_URI: process.env.MONGODB_URI,
    }),
    {
      status: 200,
    }
  );
};
