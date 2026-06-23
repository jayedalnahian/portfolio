import { catchAsync } from "../../shared/catchAsync.js";
import { Request, Response } from "express";
import { ProfileService } from "./profile.service.js";
import { sendResponse } from "../../shared/sendResponse.js";
import httpStatus from "http-status";

const createProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await ProfileService.createProfile(req.body, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile created successfully",
    data: result,
    error: null,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await ProfileService.getProfile(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
    error: null,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await ProfileService.updateProfile(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
    error: null,
  });
});

const deleteProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await ProfileService.deleteProfile(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile deleted successfully",
    data: result,
    error: null,
  });
});

export const ProfileController = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};
