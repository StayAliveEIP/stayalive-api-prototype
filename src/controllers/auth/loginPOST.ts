import express, {NextFunction} from "express";
import {compare} from "@src/util/pwd-util";
import {sign} from "@src/util/jwt-util";
import userModels from "@src/mongo/userModels";
import {UserType} from "@src/types/mongo/user";

export default async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({error: "Missing email or password"});
        const user = await userModels.findOne({email: email});
        if (!user)
            return res.status(400).json({error: "User not found"});
        const userPassword: string = user.pwdHash === undefined ? "" : user.pwdHash;
        if (!await compare(password, userPassword))
            return res.status(400).json({error: "Wrong password"});
        res.cookie("token", sign(user));
        return res.status(200).json({message: "User logged in"});
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}