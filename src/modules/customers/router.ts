import { Router } from "express";
import * as controller from "./controllers/index.js";
import { userMiddleware } from "@src/middleware/auth.middleware.js";

const router = Router();

router.post("/", controller.create);
router.get("/:id", userMiddleware, controller.read);
router.get("/", userMiddleware, controller.readMany);
router.patch("/:id", controller.update);
router.delete("/:id", controller.destroy);

export default router;
