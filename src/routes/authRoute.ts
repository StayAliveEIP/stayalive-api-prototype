// crete a router
import {Router} from "express";

const router = Router();

const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");

router.post("/login", loginController);
router.post("/register", registerController);

export default router;