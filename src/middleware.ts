import { NextRequest, NextResponse } from "next/server";

import { getUserFromCookie, setCookie } from "./lib/actions/Server/cookies";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard", "/createTeam"];
const publicRoutes = ["/signIn", "/signUp"];

export default async function middleware(req: NextRequest) {
  const session = await getUserFromCookie();
  //console.log(session, "check session");
  const cookieStore = cookies();
  const user = cookieStore.get("accessToken");
  //console.log(req, "check request");

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  //   console.log(req.nextUrl.pathname, "nextUrl pathname");
  //   console.log(req.nextUrl.searchParams, "nextUrl s3earcb param");

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !user) {
    //console.log("get in the loop");
    // setCookie("intendedRoutes", path);
    return NextResponse.redirect(
      new URL(`/signIn?destination=${path}`, req.nextUrl)
    );
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
