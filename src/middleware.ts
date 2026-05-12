import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: [
    "/profile/:path*",
    "/wardrobe/:path*",
    "/outfits/:path*",
    "/admin/:path*",
  ],
};
