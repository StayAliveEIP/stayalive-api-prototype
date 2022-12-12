// crete a router
import express, {Router} from "express";

const router = Router();

import InterventionPOST from "@src/controllers/intervention/interventionPOST";

router.post("/", InterventionPOST);

export default router;