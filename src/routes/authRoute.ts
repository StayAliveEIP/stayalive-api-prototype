// crete a router
import express, {NextFunction, Router} from "express";

const router = Router();
import LoginController from "@src/controllers/auth/loginController";
import RegisterController from "@src/controllers/auth/registerController";

router.post("/login", LoginController);
router.post("/register", RegisterController);

export default router;