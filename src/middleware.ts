import { NextRequest, NextResponse } from "next/server";

import { getCookie, setCookie } from "./lib/actions/Server/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";

const protectedRoutes = ["/dashboard", "/createTeam", "/joinTeam"];
const publicRoutes = ["/signIn", "/signUp"];

export default async function middleware(req: NextRequest) {
  //console.log(session, "check session");
  const cookieStore = cookies();
  const user = cookieStore.get("accessToken");

  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  //console.log(req.nextUrl.pathname, "nextUrl pathname");
  const searchParams = req.nextUrl.searchParams;
  const params: { [key: string]: string } = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  //console.log(params.joinId, "nextUrl search params");

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && path === "/joinTeam" && !user) {
    return NextResponse.redirect(
      new URL(
        `/signIn?destination=${path}&joinId=${params?.joinId}`,
        req.nextUrl
      )
    );
  } else if (isProtectedRoute && !user) {
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
