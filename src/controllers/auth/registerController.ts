import express, {NextFunction} from "express";
import emailValidator from "email-validator";

import userModels from "@src/mongo/userModels";
import bcrypt from "bcrypt";

export default async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        if (!email || !password)
            return res.status(400).json({error: "Missing email or password"});
        if (password.length < 8)
            return res.status(400).json({error: "Password must be at least 8 characters"});
        if (!emailValidator.validate(email))
            return res.status(400).json({error: "Invalid email"});
        const user = await userModels.findOne({email: email});
        if (user)
            return res.status(400).json({error: "Email already in use"});
        const passwordHashed = await getPasswordHashed(password);
        const newUser = new userModels({
            email: email,
            pwdHash: passwordHashed
        });
        await newUser.save();
        return res.status(200).json({message: "User created"});
    } catch (err) {
        console.log(err);
    }
}

const getPasswordHashed = async (password: string): Promise<string> => {
    return (bcrypt.hashSync(password, 10));
}
