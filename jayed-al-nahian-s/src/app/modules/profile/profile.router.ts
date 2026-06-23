import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { createProfileSchema, updateProfileSchema } from "./profile.validate.js";
import { ProfileController } from "./profile.controller.js";

const router = Router();

router.post(
  "/create-profile",
  checkAuth(),
  validateRequest(createProfileSchema),
  ProfileController.createProfile,
);

router.get(
  "/",
  checkAuth(),
  ProfileController.getProfile,
);

router.patch(
  "/update-profile",
  checkAuth(),
  validateRequest(updateProfileSchema),
  ProfileController.updateProfile,
);

router.delete(
  "/delete-profile",
  checkAuth(),
  ProfileController.deleteProfile,
);

export const ProfileRouter = router;
