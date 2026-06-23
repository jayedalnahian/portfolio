import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";


import { bearer, } from "better-auth/plugins";

import { envVars } from "../config/env.js";
import { UserStatus } from "../generated/prisma/client.js";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    bearer(),
    
  ],
  user: {
    additionalFields: {
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE,
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },

      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null,
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },
  session: {
    expiresIn: 60 * 60 * 60 * 24, // 1 day in seconds
    updateAge: 60 * 60 * 60 * 24, // 1 day in seconds
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 60 * 24, // 1 day in seconds
    },
  },

  redirectURLs: {
    signIn: `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`,
  },

  trustedOrigins: [
    envVars.BETTER_AUTH_URL || "http://localhost:5050",
    envVars.FRONTEND_URL || "http://localhost:3000",
  ],

  advanced: {
    disableCSRFCheck: true,
    disableOriginCheck: true,
    useSecureCookies: false,
    cookies: {
      state: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/",
        },
      },
      sessionToken: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/",
        },
      },
    },
  },
});
