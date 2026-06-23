import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { createHobbySchema, updateHobbySchema } from "./hobby.validate.js";
import { HobbyController } from "./hobby.controller.js";

const router = Router();

router.post(
  "/create-hobby",
  checkAuth(),
  validateRequest(createHobbySchema),
  HobbyController.createHobby,
);

router.get(
  "/",
  checkAuth(),
  HobbyController.getAllHobbies,
);

router.patch(
  "/:id",
  checkAuth(),
  validateRequest(updateHobbySchema),
  HobbyController.updateHobby,
);

router.delete(
  "/:id",
  checkAuth(),
  HobbyController.deleteHobby,
);

export const HobbyRouter = router;
