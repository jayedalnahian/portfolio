import { catchAsync } from "../../shared/catchAsync.js";
import { Request, Response } from "express";
import { MessageService } from "./message.service.js";
import { sendResponse } from "../../shared/sendResponse.js";
import httpStatus from "http-status";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.createMessage(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message sent successfully",
    data: result,
    error: null,
  });
});

const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const result = await MessageService.getAllMessages(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Messages retrieved successfully",
    data: result,
    error: null,
  });
});

const markMessageAsRead = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MessageService.markMessageAsRead(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message marked as read successfully",
    data: result,
    error: null,
  });
});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MessageService.deleteMessage(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message deleted successfully",
    data: result,
    error: null,
  });
});

export const MessageController = {
  createMessage,
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
};
