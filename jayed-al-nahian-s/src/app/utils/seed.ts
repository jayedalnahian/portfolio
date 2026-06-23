import { auth } from "../lib/auth.js";
import { prisma } from "../lib/prisma.js";
import { envVars } from "../config/env.js";

export const seedAdmin = async () => {
  const userEmail = envVars.USER_EMAIL;
  const userPassword = envVars.USER_PASSWORD;
  const userName = envVars.USER_NAME;

  
  try {
    // 1. Check if ANY user exists with this email
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    // 2. If user exists and is already SUPER_ADMIN, check if Admin profile exists
    if (existingUser) {
      const userProfile = await prisma.user.findUnique({
        where: { id: existingUser.id },
      });
      if (userProfile) {
        console.log(
          "User already exists with profile. Skipping seeding.",
        );
        return;
      }
    }

    let userId: string;

    if (!existingUser) {
      console.log("Creating User...");
      const signUpResponse = await auth.api.signUpEmail({
        body: {
          email: userEmail,
          password: userPassword,
          name: userName,
        } as any,
      });

      if (!signUpResponse || !signUpResponse.user) {
        throw new Error("Failed to create user via auth.api");
      }
      userId = signUpResponse.user.id;
    } else {
     console.log("User already exists");
      userId = existingUser.id;
    }

     console.log("User Seeded Successfully");
  } catch (error) {
    console.error("Error seeding user: ", error);
    // We avoid deleting the user here to prevent P2003 (Foreign Key constraint violation)
    // and to avoid accidentally deleting a user that might have been partially correctly created.
  }
};
