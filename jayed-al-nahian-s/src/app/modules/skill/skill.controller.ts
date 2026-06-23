import { catchAsync } from "../../shared/catchAsync.js";
import { Request, Response } from "express";
import { SkillService } from "./skill.service.js";
import { sendResponse } from "../../shared/sendResponse.js";
import httpStatus from "http-status";

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await SkillService.createSkill(req.body, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill created successfully",
    data: result,
    error: null,
  });
});

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillService.getAllSkills();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skills retrieved successfully",
    data: result,
    error: null,
  });
});

const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SkillService.updateSkill(id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill updated successfully",
    data: result,
    error: null,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SkillService.deleteSkill(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill deleted successfully",
    data: result,
    error: null,
  });
});

export const SkillController = {
  createSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
};
