// crete a router
import express, {Router} from "express";

const router = Router();

import AuthMiddleware from "@src/middleware/authMiddleware";

router.post("/", AuthMiddleware, (req: express.Request, res: express.Response) => {
    return res.status(200).json({message: "User passed auth middleware"});
});

export default router;