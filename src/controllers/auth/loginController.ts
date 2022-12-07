import express, {NextFunction} from "express";

export default (req: express.Request, res: express.Response, next: NextFunction) => {
    const {email, password} = req.body;
    if (!email || !password)
        return res.status(400).json({error: "Missing email or password"});

}