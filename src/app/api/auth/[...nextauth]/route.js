import connectDB from '@/db';
import User from '@/models/User.model';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const login = async (credentials) => {
  const { email, password } = credentials;

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid Email!');

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new Error('Invalid Password!');

    return user;
  } catch (error) {
    console.log('🚀 ~ login ~ error:', error.message);
    throw new Error('Something went wrong.');
  }
};

export const authOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          throw new Error('Failed to Login.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.email = token.email;
        session.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
