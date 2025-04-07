import { NextResponse } from "next/server";

import { jwtDecode } from "jwt-decode";
import { getIsAdmin } from "./lib/auth";

function isTokenValid(token) {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdmin = getIsAdmin(token);

  const isProtectedRoute = pathname.startsWith("/book") || pathname.startsWith("/profile");
  
  if (isProtectedRoute && !isTokenValid(token) && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isMediaRequest = pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i);
  if (isAdmin && !isAdminRoute && !isMediaRequest) {
    return NextResponse.redirect(new URL("/admin/users", request.url));
  }

  if (!isAdmin && isAdminRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/((?!_next/static|favicon.ico|public/).*)",
  ],
};