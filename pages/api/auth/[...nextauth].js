import NextAuth from "next-auth";
import spotifyApi, { LOGIN_URL } from "@/lib/spotify";
import SpotifyProvider from "next-auth/providers/spotify"

async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("Refresh Token is ", refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }

    } catch (error) {
        console.log(error);
        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            authorization: LOGIN_URL,
        }),
        // ...add more providers here
    ],
    session: {
        strategy: "jwt",
      },
    secret: process.env.JWT_SECRET,
    pages: {
        signin: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            //intial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountID,
                    accessTokenExpires: account.expires_at * 1000,
                }
            }

            //if access token not expired
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            return await refreshAccessToken(token)
        },
        async session({ session, token }) {
            
            session.user.accessToken = token.accessToken,
            session.user.refreshToken = token.refreshToken,
            session.user.username = token.username
            return session;
        }


    }
});

