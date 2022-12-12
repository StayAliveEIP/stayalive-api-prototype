import express, {NextFunction} from "express";
import {compare} from "@src/util/pwd-util";
import {sign} from "@src/util/jwt-util";
import userModels from "@src/mongo/userModels";
import {UserType} from "@src/types/mongo/user";

/**
 * This route should follow the documentation here
 * {@link https://github.com/StayAliveEIP/stayalive-backend/wiki/Request-for-help-call-center}
 * @param req The request
 * @param res The response
 */
export default async (req: express.Request, res: express.Response) => {
    try {
        return (res.status(500).json({message: "Route under construction"}));
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}