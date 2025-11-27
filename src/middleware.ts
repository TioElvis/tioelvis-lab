import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const isLoggedIn = !!request.auth;
  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isOnAuthRoot = request.nextUrl.pathname.startsWith("/auth");

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (isOnAuthRoot && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
