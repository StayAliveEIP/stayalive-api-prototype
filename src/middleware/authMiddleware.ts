// create a middleware to verify the token
import express from "express";
import jwtUtil from "@src/util/jwt-util";
import userModels from "@src/mongo/userModels";
import mongoose from "mongoose";
import {TokenDecoded} from "@src/types/global";

import verifyAuthorizationHeader from "@src/util/verify-auth";

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization;
  const errorMessage = verifyAuthorizationHeader(token);
  if (errorMessage)
      return res.status(401).json({error: errorMessage});
  next();
};

