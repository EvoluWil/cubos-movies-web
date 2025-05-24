import { authService } from '@/services/auth.service';
import { User } from '@/types/user.type';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '../api/api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const result = await authService.signIn({
          email: credentials?.email as string,
          password: credentials?.password as string,
        });

        if (result) {
          return {
            ...result.user,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.token = user.token;
        token.email = user.email;
      }

      if (trigger === 'update' && session) {
        token.name = session.name;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token as User;
      api.defaults.headers.common.Authorization = `Bearer ${token.token}`;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
