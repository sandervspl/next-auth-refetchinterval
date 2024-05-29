import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { decodeJwt } from 'jose';

// Extend JWT and User types for our use case
declare module 'next-auth/jwt' {
  export interface JWT {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }
}

declare module 'next-auth' {
  export interface User {
    access: string;
    refresh: string;
  }

  export interface Session {
    accessToken: string;
    refreshToken: string;
  }
}

const TOKEN_EXPIRE_FALLBACK = 5 * 60 * 1000;

const refreshToken = async (token: JWT) => {
  return token;
};

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
      },
      async authorize(credentials) {
        return {
          id: '1',
          access: 'acc_g4g42g-2g-3h3-h3-3b343',
          refresh: 'ref_g4g42g-2g-3h3-h3-3b343',
          name: credentials?.username,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      try {
        // eslint-disable-next-line no-console
        console.log('JWT CALLBACK, DO WE HAVE "UPDATE" TRIGGER?', { trigger });

        // Initial sign in
        if (user) {
          token.accessToken = user.access;
          token.refreshToken = user.refresh;
          token.name = user.name;

          const expiresAt = decodeJwt(token.accessToken).exp;
          token.expiresAt = expiresAt || TOKEN_EXPIRE_FALLBACK;
        }

        if (!token) {
          throw new Error('No token returned');
        }

        return token;
      } catch (err: any) {
        console.error('NextAuth: Missing token', err.message);

        return {
          ...token,
          error: 'MissingAccessTokenError',
        };
      }
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = {
        name: token.name,
      };

      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
