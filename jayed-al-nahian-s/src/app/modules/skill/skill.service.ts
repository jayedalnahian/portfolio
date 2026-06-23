import { prisma } from "../../lib/prisma.js";
import { createSkill, updateSkill } from "./skill.interface.js";

const createSkill = async (payload: createSkill, userId: string) => {
  const result = await prisma.skill.create({
    data: { ...payload, userId },
  });
  return result;
};

const getAllSkills = async () => {
  const result = await prisma.skill.findMany({
    orderBy: [
      { category: "asc" },
      { order: "asc" },
    ],
  });
  return result;
};

const updateSkill = async (
  id: string,
  payload: updateSkill,
) => {
  const result = await prisma.skill.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteSkill = async (id: string) => {
  const result = await prisma.skill.delete({
    where: { id },
  });
  return result;
};

export const SkillService = {
  createSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
};
