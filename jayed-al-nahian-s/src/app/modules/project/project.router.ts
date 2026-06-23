import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { createProjectSchema, updateProjectSchema } from "./project.validate.js";
import { ProjectController } from "./project.controller.js";

const router = Router();

router.post(
  "/create-project",
  checkAuth(),
  validateRequest(createProjectSchema),
  ProjectController.createProject,
);

router.get(
  "/",
  checkAuth(),
  ProjectController.getAllProjects,
);

router.patch(
  "/:id",
  checkAuth(),
  validateRequest(updateProjectSchema),
  ProjectController.updateProject,
);

router.delete(
  "/:id",
  checkAuth(),
  ProjectController.deleteProject,
);

export const ProjectRouter = router;
