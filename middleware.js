import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req) {

  const token = await getToken({ req, secret: process.env.JWT_SECRET });


  const { pathname } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // if (token && pathname === "/") {
  //   return NextResponse.redirect("http://localhost:3000/login",pathname)
  // }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`, pathname)
  }

}
export const config = { matcher: ['/'] }


