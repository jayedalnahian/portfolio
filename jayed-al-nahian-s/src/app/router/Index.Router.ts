import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.router.js";
import { EducationRouter } from "../modules/education/education.router.js";
import { ProfileRouter } from "../modules/profile/profile.router.js";
import { HobbyRouter } from "../modules/hobby/hobby.router.js";
import { MessageRouter } from "../modules/message/message.router.js";
import { ProjectRouter } from "../modules/project/project.router.js";
import { SkillRouter } from "../modules/skill/skill.router.js";
import { StatRouter } from "../modules/stat/stat.router.js";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/education", EducationRouter);
router.use("/profile", ProfileRouter);
router.use("/hobby", HobbyRouter);
router.use("/message", MessageRouter);
router.use("/project", ProjectRouter);
router.use("/skill", SkillRouter);
router.use("/stat", StatRouter);

export const IndexRouter = router;

