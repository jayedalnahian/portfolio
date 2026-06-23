import { catchAsync } from "../../shared/catchAsync.js";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/sendResponse.js";
import status from "http-status";
import { AuthService } from "./auth.service.js";
import AppError from "../../errorHalpers/AppError.js";
import { cookieUtils } from "../../utils/cookie.js";
import { IRequestUser } from "../../interface/requestUser.interface.js";
import { tokenUtils } from "../../utils/token.js";




const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
    error: null,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  const result = await AuthService.logoutUser(betterAuthSessionToken);
  cookieUtils.clearCookie(res, "accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  cookieUtils.clearCookie(res, "refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  cookieUtils.clearCookie(res, "better-auth.session_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged out successfully",
    data: result,
    error: null,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log("User from getMe", user);
  console.log("User type", typeof user);
  const result = await AuthService.getMe(user as IRequestUser);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
    error: null,
  });
});

const getNewToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  if (!refreshToken) {
    throw new AppError(status.UNAUTHORIZED, "Refresh token is missing");
  }
  const result = await AuthService.getNewToken(
    refreshToken,
    betterAuthSessionToken,
  );

  const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, sessionToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken,
      sessionToken,
    },
    error: null,
  });
});











export const AuthController = {
  loginUser,
  getMe,
  getNewToken,
  logoutUser,

};
