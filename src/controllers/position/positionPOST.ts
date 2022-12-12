import express from "express";

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return (res.json({message: "Hello world"}));
}