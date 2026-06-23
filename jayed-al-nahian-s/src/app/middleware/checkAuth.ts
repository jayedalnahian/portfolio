import { NextFunction, Request, Response } from "express";
import status from "http-status";
import AppError from "../errorHalpers/AppError.js";
import { prisma } from "../lib/prisma.js";
import { cookieUtils } from "../utils/cookie.js";
import { jwtUtils } from "../utils/jwt.js";
import { envVars } from "../config/env.js";


export const checkAuth =
  () =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let sessionToken = cookieUtils.getCookie(
        req,
        "better-auth.session_token",
      );
      if (!sessionToken) {
        throw new Error("Unauthorized access! No session token provided.");
      }

      if (sessionToken) {
        const sessionExists = await prisma.session.findUnique({
          where: {
            token: sessionToken,
            expiresAt: {
              gt: new Date(),
            },
          },
          include: {
            user: true,
          },
        });

        if (sessionExists && sessionExists.user) {
          const user = sessionExists.user;

          const now = new Date();
          const expiresAt = new Date(sessionExists.expiresAt);
          const createdAt = new Date(sessionExists.createdAt);

          const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
          const timeRemaining = expiresAt.getTime() - now.getTime();
          const percentRemaining = (timeRemaining / sessionLifeTime) * 100;

          if (percentRemaining < 20) {
            res.setHeader("X-Session-Refresh", "true");
            res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
            res.setHeader("X-Time-Remaining", timeRemaining.toString());

            console.log("Session Expiring Soon!!");
          }


          req.user = {
            userId: user.id,
            email: user.email,
            name: user.name,
          };
        }

        const accessToken = cookieUtils.getCookie(req, "accessToken");

        if (!accessToken) {
          throw new AppError(
            status.UNAUTHORIZED,
            "Unauthorized access! No access token provided.",
          );
        }
      }

      //Access Token Verification
      const accessToken = cookieUtils.getCookie(req, "accessToken");

      if (!accessToken) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! No access token provided.",
        );
      }

      const verifiedToken = jwtUtils.verifyToken(
        accessToken,
        envVars.ACCESS_TOKEN_SECRET,
      );

      if (!verifiedToken.success) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! Invalid access token.",
        );
      }

      // Fallback: If req.user was not set from session, populate from access token
      if (!req.user && verifiedToken.data) {
        req.user = {
          userId: verifiedToken.data.userId as string,
          email: verifiedToken.data.email as string,
          name: verifiedToken.data.name as string,
        };
      }

      // Ensure req.user is defined before proceeding
      if (!req.user) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! User information not found.",
        );
      }

   

      next();
    } catch (error: any) {
      next(error);
    }
  };
