import express, {NextFunction} from "express";
import {compare} from "@src/util/pwd-util";
import {sign} from "@src/util/jwt-util";
import userModels from "@src/mongo/userModels";
import {UserType} from "@src/types/mongo/user";

/**
 * This route should follow the documentation here
 * https://github.com/StayAliveEIP/stayalive-backend/wiki/Request-for-help-call-center
 * @param req The request
 * @param res The response
 */
export default async (req: express.Request, res: express.Response) => {
  try {
    const position  = req.body.position;
    const location : object = req.body.location;
    if (position)
      if (position.lat && position.lng) {

      } else {
        res.status(400).json({error: "Position must have lat and lng"});
      }
    if (!location && !position)
      return res.status(400).json({error: "Missing location or position"});
    return res.status(200).json({message: "OK"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({error: "Internal server error"});
  }
};
