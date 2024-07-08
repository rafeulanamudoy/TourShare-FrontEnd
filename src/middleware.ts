import { NextRequest, NextResponse } from "next/server";
import { getSingleUserById } from "./lib/actions/Server/user";
import { verifyJwt } from "./lib/actions/Server/cookies";

const protectedRoutes = [
  "/dashboard",
  "/dashboard/team",
  "/dashboard/joinTeam",
  "/dashboard/profile",
  "/dashboard/messages",
  "/createTeam",
  "/joinTeam",
];
const publicRoutes = ["/signIn", "/signUp"];

export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const searchParams = req.nextUrl.searchParams;
  const params: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  if (isProtectedRoute && path === "/joinTeam" && !accessToken) {
    return NextResponse.redirect(
      new URL(
        `/signIn?destination=${path}&joinId=${params?.joinId}`,
        req.nextUrl
      )
    );
  } else if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(
      new URL(`/signIn?destination=${path}`, req.nextUrl)
    );
  }
  //logic to remove access token when admin remove the account from database
  if (accessToken) {
    try {
      const decodedToken = await verifyJwt(
        accessToken,
        process.env.JWT_SECRET as string
      );

      const user = await getSingleUserById(decodedToken._id);
      if (!user?.data) {
        const response = NextResponse.next();
        response.cookies.set("accessToken", "", {
          maxAge: -1,
          expires: new Date(0),
          path: "/",
          domain: req.nextUrl.hostname, // Adjust the domain to match  current request's domain
        });
        console.log(req.nextUrl.hostname, "check host name");
        return response;
      }
    } catch (error) {
      const response = NextResponse.next();
      response.cookies.set("accessToken", "", {
        maxAge: -1,
        expires: new Date(0),
        path: "/",
        domain: req.nextUrl.hostname, // Adjust the domain to match  current request's domain
      });
      return response;
    }
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
