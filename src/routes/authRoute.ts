// crete a router
import {Router} from "express";

const router = Router();
import LoginController from "@src/controllers/auth/loginPOST";
import RegisterController from "@src/controllers/auth/registerPOST";

router.post("/login", LoginController);
router.post("/register", RegisterController);

export default router;