import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";



const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
   
  ],
  callbacks: {
    async session({ session }) {
      
      const userSession = await User.findOne({ email: session.user.email });
      session.user.id = userSession._id.toString();
      
      return session;
    },
    async signIn({ profile }) {
      try {
        
        await connectToDB();

        
        // check user if already exits
        const userExists = await User.findOne({ email: profile.email });
        //  create new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.toLowerCase(),
            image: profile.picture,
           
          });
        }
       
       
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
