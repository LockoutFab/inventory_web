import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./lib";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/database/", "/api/:path*", "/change/:path*"],
// };
