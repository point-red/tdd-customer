import { userMiddleware } from "@src/middleware/auth.middleware.js";
import { Router } from "express";
import * as controller from "./controllers/index.js";

const router = Router();

router.post("/", userMiddleware, controller.create);
router.get("/:id", userMiddleware, controller.read);
router.get("/", userMiddleware, controller.readMany);
router.patch("/:id", userMiddleware, controller.update);
router.delete("/:id", userMiddleware, controller.destroy);

export default router;
