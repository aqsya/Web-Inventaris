export const authConfig = {
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/product");

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;
            }

            return true;
        },
    },
    providers: [],
};
