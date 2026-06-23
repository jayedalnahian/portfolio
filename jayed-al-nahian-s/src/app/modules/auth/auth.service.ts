import status from "http-status";
import { auth } from "../../lib/auth.js";
import { IAuth, IChangePasswordPayload } from "./auth.type.js";
import prismaPkg from "../../generated/prisma/index.js";
import { IRequestUser } from "../../interface/requestUser.interface.js";
import { prisma } from "../../lib/prisma.js";
import AppError from "../../errorHalpers/AppError.js";
import { tokenUtils } from "../../utils/token.js";
import { jwtUtils } from "../../utils/jwt.js";
import { envVars } from "../../config/env.js";
import { JwtPayload } from "jsonwebtoken";

const registerUser = async (payload: IAuth, image?: string) => {
  const { name, email, password } = payload;

  const signUpBody: Record<string, string> = {
    name,
    email,
    password,
  };
  if (image) signUpBody.image = image;
  try {
    const data = await auth.api.signUpEmail({
      body: signUpBody as any,
    });

    if (!data.user) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        "User registration failed",
      );
    }

    const accessToken = tokenUtils.getAccessToken({
      userId: data.user.id,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
      userId: data.user.id,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified,
    });

    return {
      ...data,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log("user registration failed (auth.service.ts)", error);
    throw new AppError(status.INTERNAL_SERVER_ERROR, "User registration failed");
  }
};

const loginUser = async (payload: IAuth) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    name: data.user.name,
    email: data.user.email,
  });

  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    name: data.user.name,
    email: data.user.email,
  });

  return {
    ...data,
    accessToken,
    refreshToken,
  };
};

const logoutUser = async (sessionToken: string) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`,
    }),
  });

  return result;
};

const getMe = async (user: IRequestUser) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });
  return userData;
};

const getNewToken = async (refreshToken: string, sessionToken: string) => {
  if (!sessionToken) {
    throw new AppError(status.UNAUTHORIZED, "Invalid session token provided");
  }

  const isSessionTokenExists = await prisma.session.findUnique({
    where: {
      token: sessionToken,
    },
    include: {
      user: true,
    },
  });

  if (!isSessionTokenExists) {
    throw new AppError(status.UNAUTHORIZED, "Invalid session token");
  }

  const verifiedRefreshToken = jwtUtils.verifyToken(
    refreshToken,
    envVars.REFRESH_TOKEN_SECRET,
  );

  if (!verifiedRefreshToken.success && verifiedRefreshToken.error) {
    throw new AppError(status.UNAUTHORIZED, "Invalid refresh token");
  }

  const data = verifiedRefreshToken.data as JwtPayload;

  const newAccessToken = tokenUtils.getAccessToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
    emailVerified: data.emailVerified,
  });

  const newRefreshToken = tokenUtils.getRefreshToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
    emailVerified: data.emailVerified,
  });

  const { token } = await prisma.session.update({
    where: {
      token: sessionToken,
    },
    data: {
      token: sessionToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1000),
      updatedAt: new Date(),
    },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken: token,
  };
};

export const AuthService = {
  loginUser,
  logoutUser,
  getMe,
  getNewToken,
};
