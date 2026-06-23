import { Router } from "express";

import {
  loginUserSchema,
 
} from "./auth.validation.js";
import { AuthController } from "./auth.controller.js";
import { checkAuth } from "../../middleware/checkAuth.js";

import { validateRequest } from "../../middleware/validateRequest.js";

const router = Router();
router.post(
  "/login",
  validateRequest(loginUserSchema),
  AuthController.loginUser,
);
router.post(
  "/logout",
  checkAuth(),
  AuthController.logoutUser,
);

router.post(
  "/refresh-token",
  AuthController.getNewToken
);

router.get(
  "/me",
  checkAuth(),
  AuthController.getMe,
);



export const AuthRouter = router;
