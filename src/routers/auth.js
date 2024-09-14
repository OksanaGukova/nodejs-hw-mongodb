import { Router } from "express";
import { validateBody } from "../midlewares/validateBody.js";
import { registerUserSchema } from "../validation/auth.js";
import { registerUserController } from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = new Router();

router.post('register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

export default router;
