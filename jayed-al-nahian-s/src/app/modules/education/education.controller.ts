import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";
import { EducationService } from "./education.service";
import { sendResponse } from "../../shared/sendResponse";
import httpStatus from "http-status";

const createEducation = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await EducationService.createEducation(req.body, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Education created successfully",
    data: result.data,
    error: null,
  });
});

const getAllEducation = catchAsync(async (req: Request, res: Response) => {
  const result = await EducationService.getAllEducation();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Education get successfully",
    data: result,
    error: null,
  });
});

const updateEducation = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const { id } = req.params;
  const result = await EducationService.updateEducation(
    id as string,
    req.body,
    userId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Education updated successfully",
    data: result,
    error: null,
  });
});

const deleteEducation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EducationService.deleteEducation(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Education deleted successfully",
    data: result,
    error: null,
  });
});

export const EducationController = {
  createEducation,
  getAllEducation,
  updateEducation,
  deleteEducation,
};
