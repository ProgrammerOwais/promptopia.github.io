// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { connectToDB } from "@utils/database";
// import User from "@models/user";
// // import { ServerSession } from "mongodb";
// // console.log({
// //   clientId: process.env.GOOGLE_ID,
// //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// // });
// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     // session is for checking & making sure which user is currently online
//     async session({ session }) {
//       const sessionUser = await User.findOne({ email: session.user.email });
//       // update the user id
//       session.user.id = sessionUser._id.toString();
//       return session;
//     },
//     async signIn({ profile }) {
//       try {
//         await connectToDB();
//         // check if user already exist
//         const userExist = await User.findOne({ email: profile.email });

//         // if not create a new user
//         if (!userExist) {
//           await User.create({
//             email: profile.email,
//             name: profile.name.replace(" ", "").toLowerCase(),
//             image: profile.picture,
//           });
//         }

//         return true;
//       } catch (error) {
//         console.log("the error in signing in", error.message);
//         return false;
//       }
//     },
//   },
// });

// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 4000,
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
