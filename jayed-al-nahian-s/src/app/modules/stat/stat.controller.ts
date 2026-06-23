import { catchAsync } from "../../shared/catchAsync.js";
import { Request, Response } from "express";
import { StatService } from "./stat.service.js";
import { sendResponse } from "../../shared/sendResponse.js";
import httpStatus from "http-status";

const createStat = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await StatService.createStat(req.body, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stat created successfully",
    data: result,
    error: null,
  });
});

const getAllStats = catchAsync(async (req: Request, res: Response) => {
  const result = await StatService.getAllStats();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stats retrieved successfully",
    data: result,
    error: null,
  });
});

const updateStat = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StatService.updateStat(id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stat updated successfully",
    data: result,
    error: null,
  });
});

const deleteStat = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StatService.deleteStat(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stat deleted successfully",
    data: result,
    error: null,
  });
});

export const StatController = {
  createStat,
  getAllStats,
  updateStat,
  deleteStat,
};
