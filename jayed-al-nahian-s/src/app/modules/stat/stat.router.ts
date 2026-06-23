import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { createStatSchema, updateStatSchema } from "./stat.validate.js";
import { StatController } from "./stat.controller.js";

const router = Router();

router.post(
  "/create-stat",
  checkAuth(),
  validateRequest(createStatSchema),
  StatController.createStat,
);

router.get(
  "/",
  checkAuth(),
  StatController.getAllStats,
);

router.patch(
  "/:id",
  checkAuth(),
  validateRequest(updateStatSchema),
  StatController.updateStat,
);

router.delete(
  "/:id",
  checkAuth(),
  StatController.deleteStat,
);

export const StatRouter = router;
