import { NextResponse } from "next/server";

export default function middleware(req) {
    const { nextUrl, cookies } = req;
    const isLoggedIn = !!cookies.get("accessToken")?.value;

    const isStaffRoute = nextUrl.pathname.startsWith("/staff") && nextUrl.pathname !== "/staff/login";
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
    const isAuthRoute = ["/login", "/signup", "/staff/login"].includes(nextUrl.pathname);

    // Redirect unauthenticated users trying to access protected routes
    if ((isStaffRoute || isDashboardRoute) && !isLoggedIn) {
        if (isStaffRoute) {
            return NextResponse.redirect(new URL("/staff/login", nextUrl));
        }
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    // Redirect authenticated users away from auth pages
    if (isAuthRoute && isLoggedIn) {
        // If trying to access staff login while logged in, go to dashboard or previous clinic
        // We can't easily know the clinic slug here without parsing JWT, so just go to dashboard
        // The user can navigate from there
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
