import { catchAsync } from "../../shared/catchAsync.js";
import { Request, Response } from "express";
import { HobbyService } from "./hobby.service.js";
import { sendResponse } from "../../shared/sendResponse.js";
import httpStatus from "http-status";

const createHobby = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await HobbyService.createHobby(req.body, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hobby created successfully",
    data: result,
    error: null,
  });
});

const getAllHobbies = catchAsync(async (req: Request, res: Response) => {
  const result = await HobbyService.getAllHobbies();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hobbies retrieved successfully",
    data: result,
    error: null,
  });
});

const updateHobby = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await HobbyService.updateHobby(id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hobby updated successfully",
    data: result,
    error: null,
  });
});

const deleteHobby = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await HobbyService.deleteHobby(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hobby deleted successfully",
    data: result,
    error: null,
  });
});

export const HobbyController = {
  createHobby,
  getAllHobbies,
  updateHobby,
  deleteHobby,
};
