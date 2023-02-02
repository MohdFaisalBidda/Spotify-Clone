import NextAuth from "next-auth";
import spotifyApi, { LOGIN_URL } from "@/lib/spotify";
import SpotifyProvider from "next-auth/providers/spotify"

async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const { body: refreshToken } = await spotifyApi.refreshAccessToken();
        console.log("Refresh Token is ", refreshToken);

        return {
            ...token,
            accessToken: refreshToken.access_token,
            accessTokenExpires: Date.now() + refreshAccessToken.expires_at * 1000,
            refreshToken: refreshToken.refresh_token ?? token.refreshToken
        }

    } catch (error) {
        console.log(error);
        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}

export const authOptions = ({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signin: '/login'
    },
    callback: {
        async jwt({ token, account, user }) {

            //intial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.accessToken,
                    refreshToken: account.refreshToken,
                    username: account.providerAccountID,
                    accessTokenExpires: account.expires_at * 1000
                }
            }

            //if access token not expired
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            return refreshAccessToken(token)
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken,
            session.user.refreshToken = token.refreshToken,
            session.user.username = token.username

            return session;
        }


    }
});

export default NextAuth(authOptions)