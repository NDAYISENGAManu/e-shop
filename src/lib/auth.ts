import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { User } from '@/database/models';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                const user = await User.findOne({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error('No user found with this email');
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new Error('Invalid password');
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role,
                    mustChangePassword: user.mustChangePassword || false,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.mustChangePassword = (user as any).mustChangePassword;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
                (session.user as any).mustChangePassword = token.mustChangePassword;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
