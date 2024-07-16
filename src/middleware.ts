import { NextResponse, type NextRequest } from "next/server";

// import { clerkMiddleware } from "@clerk/nextjs/server";
// export default clerkMiddleware();

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("accessToken")?.value;

  if (currentUser && request.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
