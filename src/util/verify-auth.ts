import jwtUtil from "@src/util/jwt-util";
import {TokenDecoded} from "@src/types/global";
import userModels from "@src/mongo/userModels";

export default async (token: string | undefined | null) : Promise<string | null> => {
    if (!token) return "Missing token in authorization header";
    const tokenSplit = token.split(" ")[1];
    if (!tokenSplit) return "Wrong token format, you probably forgot to add 'Bearer' before the token";
    const decoded = await jwtUtil.decode(tokenSplit);
    if (!decoded) return "Invalid token, impossible to decode";
    const tokenDecoded = decoded as TokenDecoded;
    if (!tokenDecoded.hasOwnProperty("_id")) return "Invalid token, missing id"
    const _id = tokenDecoded._id;
    if (!_id) return "Invalid token, wrong payload";
    const user = userModels.findById(_id);
    if (!user) return "Invalid token, user not found";
    return null;
}