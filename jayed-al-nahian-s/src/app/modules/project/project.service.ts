import { prisma } from "../../lib/prisma.js";
import { createProject, updateProject } from "./project.interface.js";

const createProject = async (payload: createProject, userId: string) => {
  const result = await prisma.project.create({
    data: { ...payload, userId },
  });
  return result;
};

const getAllProjects = async () => {
  const result = await prisma.project.findMany({
    orderBy: [
      { featured: "desc" },
      { createdAt: "desc" },
    ],
  });
  return result;
};

const updateProject = async (
  id: string,
  payload: updateProject,
) => {
  const result = await prisma.project.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteProject = async (id: string) => {
  const result = await prisma.project.delete({
    where: { id },
  });
  return result;
};

export const ProjectService = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
