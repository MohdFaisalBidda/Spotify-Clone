import { LOGIN_URL } from "@/lib/spotify";
import NextAuth from "next-auth"

import SpotifyProvider from "next-auth/providers/spotify"
export default NextAuth = ({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret:process.env.JWT_SECRET,
    pages: {
        signin:'/login'
    }
});