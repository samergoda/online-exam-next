import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';
export const OPTIONS = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      console.log('user from route',user)
      return { ...session, ...token };
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // const credential = credentials;
        // console.log('credentials', credentials);

        const response = await fetch(
          'https://exam.elevateegy.com/api/v1/auth/signin',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const user = await response.json();
        // console.log('user from credintials ', user);
        if (!response.ok || !user) {
          throw new Error(user.message);
        }
        // console.log('user', { token: user.token, ...user.user });

        return user; // Should return { id, email, name, ... }
      },
      credentials: {
        email: {},
        password: {},
      },
     
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0',
    }),
  ],
}
const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST };
