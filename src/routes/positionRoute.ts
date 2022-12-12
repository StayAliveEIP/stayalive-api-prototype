// crete a router
import {Router} from "express";

const router = Router();

const AuthMiddleware = require("@src/middleware/authMiddleware");

const PositionPOST = require("@src/controllers/position/positionPOST");

router.post("/", AuthMiddleware, PositionPOST);

export default router;