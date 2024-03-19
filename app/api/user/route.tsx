import postgres from "postgres";
import Cookies from "js-cookie";

const sql = postgres(process.env.DATABASE_URL as string, { ssl: "require" });

export async function POST(req: Request) {
  const { passcode } = await req.json();
  const pass = await sql`SELECT * FROM passcode WHERE passcode=${passcode}`;
  if (pass.count == 0) {
    return new Response("Wrong passcode", { status: 404 });
  } else {
    Cookies.set("loggedIn", "true");
    return {
      redirect: {
        destination: "/database",
      },
    };
  }
}
