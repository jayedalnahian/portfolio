import { catchAsync } from "../../shared/catchAsync.js";
import { Request, Response } from "express";
import { ProjectService } from "./project.service.js";
import { sendResponse } from "../../shared/sendResponse.js";
import httpStatus from "http-status";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await ProjectService.createProject(req.body, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project created successfully",
    data: result,
    error: null,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects retrieved successfully",
    data: result,
    error: null,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.updateProject(id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
    error: null,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.deleteProject(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
    error: null,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
