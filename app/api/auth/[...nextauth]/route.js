import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';
const handler = NextAuth({
  // pages: {
  //   signIn: '/auth/signup',
  // },
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // const credential = credentials;
        console.log('credentials', credentials);

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
console.log('user from credintials ',user)
        if (!response.ok || !user) {
          throw new Error(user.message);
        }
        console.log('user', {token:user.token,...user.user});

        return user; // Should return { id, email, name, ... }
      },
      credentials: {
        email: {
          label: 'Email',
          placeholder: 'Please enter your email',
          type: 'email',
        },
        password: {
          label: 'Password',
          placeholder: 'Please enter your password',
          type: 'password',
        },
      },
      //   credentials: {
      //     email: {
      //       label: "User Name",
      //       placeholder: "Please enter your user Name",
      //       type: "text",
      //     },
      //     username: {
      //       label: "User Name",
      //       placeholder: "Please enter your user Name",
      //       type: "text",
      //     },
      //     firstName: {
      //       label: "User Name",
      //       placeholder: "Please enter your user Name",
      //       type: "text",
      //     },
      //     lastName: {
      //       label: "User Name",
      //       placeholder: "Please enter your user Name",
      //       type: "text",
      //     },
      //     password: {
      //       label: "User Name",
      //       placeholder: "Please enter your user Name",
      //       type: "password",
      //     },
      //     rePassword: {
      //       label: "Password",
      //       placeholder: "Please enter your password",
      //       type: "password",
      //     },
      //     phone: {
      //       label: "Password",
      //       placeholder: "Please enter your password",
      //       type: "tel",
      //     },
      // }
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
});

export { handler as GET, handler as POST };
