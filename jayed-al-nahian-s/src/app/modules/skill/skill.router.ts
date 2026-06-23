import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { createSkillSchema, updateSkillSchema } from "./skill.validate.js";
import { SkillController } from "./skill.controller.js";

const router = Router();

router.post(
  "/create-skill",
  checkAuth(),
  validateRequest(createSkillSchema),
  SkillController.createSkill,
);

router.get(
  "/",
  checkAuth(),
  SkillController.getAllSkills,
);

router.patch(
  "/:id",
  checkAuth(),
  validateRequest(updateSkillSchema),
  SkillController.updateSkill,
);

router.delete(
  "/:id",
  checkAuth(),
  SkillController.deleteSkill,
);

export const SkillRouter = router;
