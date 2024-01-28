import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "/community",
    "/exercise",
    "/routine",
    "/schedule",
    "/profile/:id",
    "/exercise/:id",
    "/routine/:id",
    "/schedule/:id",
  ],
  ignoredRoutes: ["/api/webhook"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};