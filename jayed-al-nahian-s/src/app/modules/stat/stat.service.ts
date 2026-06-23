import { prisma } from "../../lib/prisma.js";
import { createStat, updateStat } from "./stat.interface.js";

const createStat = async (payload: createStat, userId: string) => {
  const result = await prisma.stat.create({
    data: { ...payload, userId },
  });
  return result;
};

const getAllStats = async () => {
  const result = await prisma.stat.findMany();
  return result;
};

const updateStat = async (
  id: string,
  payload: updateStat,
) => {
  const result = await prisma.stat.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteStat = async (id: string) => {
  const result = await prisma.stat.delete({
    where: { id },
  });
  return result;
};

export const StatService = {
  createStat,
  getAllStats,
  updateStat,
  deleteStat,
};
