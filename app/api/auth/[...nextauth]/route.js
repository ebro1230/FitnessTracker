import clientPromise from "@/lib/mongo";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User"; // Custom User model (optional)
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { scope: "openid email profile" }, // Default scope includes first & last name
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        await connectToDatabase();
        const user = await User.findOne({ email });

        if (!user) throw new Error(`Email Not Found, Please Sign Up`);

        if (!user.password) {
          throw new Error(
            "This Email is registered, but you have to sign in with Google"
          );
        }

        // Add your own password verification logic (e.g., bcrypt)
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error("Invalid password");

        return user;
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/auth/signin",
  // },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if the Google account is linked to an existing account
      if (account.provider === "google") {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: profile.email }); // Replace with your DB logic

        if (!existingUser) {
          const newUser = new User({
            email: profile.email,
            name: profile.name || "",
            image: profile.picture || "",
            given_name: profile.given_name || "",
            family_name: profile.family_name || "",
            // You can add any other fields you'd like to store
          });

          // Save the new user in the database
          await newUser.save();
        }
        // Return true to allow the sign-in process
        return true;
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.given_name = token.given_name; // ✅ Add first name
        session.user.family_name = token.family_name; // ✅ Add last name
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.given_name = profile.given_name; // ✅ Store first name
        token.family_name = profile.family_name; // ✅ Store last name
      }
      return token;
    },
  },
  // events: {
  //   async createUser({ user }) {
  //     try {
  //       const db = (await clientPromise).db();
  //       await db.collection("users").updateOne(
  //         { _id: user.id },
  //         {
  //           $set: {
  //             given_name: user.given_name || "test",
  //             family_name: user.family_name || "test",
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.error("Error updating user:", error);
  //     }
  //   },
  // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: { strategy: "jwt" },
// };
