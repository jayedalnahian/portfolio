import { prisma } from "../../lib/prisma.js";
import { createMessage } from "./message.interface.js";

const createMessage = async (payload: createMessage) => {
  const result = await prisma.message.create({
    data: payload,
  });
  return result;
};

const getAllMessages = async (userId: string) => {
  const result = await prisma.message.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const markMessageAsRead = async (id: string) => {
  const result = await prisma.message.update({
    where: { id },
    data: { isRead: true },
  });
  return result;
};

const deleteMessage = async (id: string) => {
  const result = await prisma.message.delete({
    where: { id },
  });
  return result;
};

export const MessageService = {
  createMessage,
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
};
