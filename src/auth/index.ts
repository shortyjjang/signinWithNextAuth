import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<User | null> {
        let user = null;

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if the user exists
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        //   method: "POST",
        //   body: JSON.stringify({email: credentials?.email, password: pwHash}),
        // })
        // user = await response.json()
        user = {
          id: "1",
          name: "John Doe",
          email: credentials?.email,
          image: "https://example.com/image.png",
        };

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user as User;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
});
