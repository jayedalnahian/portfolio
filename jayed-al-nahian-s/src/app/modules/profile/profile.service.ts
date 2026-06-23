import { prisma } from "../../lib/prisma.js";
import { createProfile, updateProfile } from "./profile.interface.js";

const createProfile = async (payload: createProfile, userId: string) => {
  const result = await prisma.profile.create({
    data: { ...payload, userId },
  });
  return result;
};

const getProfile = async (userId: string) => {
  const result = await prisma.profile.findUnique({
    where: { userId },
  });
  return result;
};

const updateProfile = async (
  userId: string,
  payload: updateProfile
) => {
  const result = await prisma.profile.update({
    where: { userId },
    data: payload,
  });
  return result;
};

const deleteProfile = async (userId: string) => {
  const result = await prisma.profile.delete({
    where: { userId },
  });
  return result;
};

export const ProfileService = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};
