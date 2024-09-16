import { Router } from "express";
import { validateBody } from "../midlewares/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import { loginUserController, logoutUserController, registerUserController } from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = new Router();

router.post('register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('logout', ctrlWrapper(logoutUserController));

export default router;
