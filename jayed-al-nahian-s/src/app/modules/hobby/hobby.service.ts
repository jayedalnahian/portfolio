import { prisma } from "../../lib/prisma.js";
import { createHobby, updateHobby } from "./hobby.interface.js";

const createHobby = async (payload: createHobby, userId: string) => {
  const result = await prisma.hobby.create({
    data: { ...payload, userId },
  });
  return result;
};

const getAllHobbies = async () => {
  const result = await prisma.hobby.findMany();
  return result;
};

const updateHobby = async (
  id: string,
  payload: updateHobby,
) => {
  const result = await prisma.hobby.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteHobby = async (id: string) => {
  const result = await prisma.hobby.delete({
    where: { id },
  });
  return result;
};

export const HobbyService = {
  createHobby,
  getAllHobbies,
  updateHobby,
  deleteHobby,
};
