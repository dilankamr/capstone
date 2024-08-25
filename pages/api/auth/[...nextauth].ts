

import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface jwt {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface ExtendedUser extends User {
    id: string;
    accessToken: string;
    email: string;
    firstName: string;
    userType: 'student' | 'guide';
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                userType: { label: "User Type", type: "text" }
            },
            authorize: async (credentials) => {
                if (!credentials) return null;

                const endpoint = credentials.userType === 'guide'
                    ? 'http://44.243.8.35:3000/auth/login/guide'
                    : 'http://44.243.8.35:3000/auth/login/student';

                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                if (res.ok) {
                    const { id, accessToken, email, firstName} = await res.json();
                    return { id, accessToken, email, firstName,userType: credentials.userType } as ExtendedUser;
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        // Use JSON Web Tokens for session instead of a database session.
        jwt: true,
        // Set a custom expiration time for the session cookie
        maxAge: 7 * 24 * 60 * 60, // 7 days
        // Set when the session should be updated in seconds
        updateAge: 24 * 60 * 60, // Every 24 hours
    },

    jwt: {
        // Set a custom expiration time for the JWT
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const extendedUser = user as ExtendedUser;
                token.id = extendedUser.id;
                token.accessToken = extendedUser.accessToken;
                token.email = extendedUser.email;
                token.firstName = extendedUser.firstName;
                token.userType = extendedUser.userType;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id,
                accessToken: token.accessToken,
                email: token.email,
                firstName: token.firstName,
                userType: token.userType,
            };
            return session;
        }
    }
};

export default NextAuth(authOptions);

