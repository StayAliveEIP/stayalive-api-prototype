// create a middleware to verify the token
import express from "express";
import jwtUtil from "@src/util/jwt-util";
import userModels from "@src/mongo/userModels";

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({error: "Missing token"});
  const decoded = await jwtUtil.decode(token);
  if (!decoded)
    return res.status(401).json({error: "Invalid token"});
  const _id = decoded._id;
  if (!_id)
    return res.status(401).json({error: "Invalid token"});
  const user = userModels.findById(_id);
  if (!user)
    return res.status(401).json({error: "Invalid token"});
  next();
};
