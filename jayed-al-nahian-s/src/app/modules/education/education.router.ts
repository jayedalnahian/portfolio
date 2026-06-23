import { Router } from "express";


import { validateRequest } from "../../middleware/validateRequest.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { createEducationSchema } from "./education.validate.js";
import { EducationController } from "./education.controller.js";

const router = Router();


router.post(
  "/create-education",
  checkAuth(),
  validateRequest(createEducationSchema),
  EducationController.createEducation,
);


router.get(
  "/",
  checkAuth(),
  EducationController.getAllEducation
  )

  router.delete(
    "/:id",
    checkAuth(),
    EducationController.deleteEducation
  )


export const EducationRouter = router;
