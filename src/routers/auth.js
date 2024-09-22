import { Router } from "express";
import { validateBody } from "../midlewares/validateBody.js";
import { loginUserSchema, registerUserSchema, requestResetEmailSchema } from "../validation/auth.js";
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController, requestResetEmailController } from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = new Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

export default router;
