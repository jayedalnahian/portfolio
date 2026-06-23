import { prisma } from "../../lib/prisma";
import { createEducation, updateEducation } from "./education.interface";

const createEducation = async (payload: createEducation, userId: string) => {
  const result = await prisma.education.create({
    data: { ...payload, userId },
  });
  return result;
};

const getAllEducation = async () => {
  const result = await prisma.education.findMany({
    orderBy: { order: "asc" },
  });
  return result;
};

const updateEducation = async (
  id: string,
  payload: updateEducation,
  userId: string,
) => {
  const result = await prisma.education.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteEducation = async (id: string) => {
  const result = await prisma.education.delete({
    where: { id },
  });
  return result;
};

export const EducationService = {
  createEducation,
  getAllEducation,
  updateEducation,
  deleteEducation,
};
