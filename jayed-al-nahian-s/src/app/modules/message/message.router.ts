import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { createMessageSchema } from "./message.validate.js";
import { MessageController } from "./message.controller.js";

const router = Router();

router.post(
  "/create-message",
  validateRequest(createMessageSchema),
  MessageController.createMessage,
);

router.get(
  "/",
  checkAuth(),
  MessageController.getAllMessages,
);

router.patch(
  "/:id/read",
  checkAuth(),
  MessageController.markMessageAsRead,
);

router.delete(
  "/:id",
  checkAuth(),
  MessageController.deleteMessage,
);

export const MessageRouter = router;
