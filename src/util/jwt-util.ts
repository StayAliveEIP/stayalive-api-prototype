import jsonwebtoken from 'jsonwebtoken';
import EnvVars from '../declarations/major/EnvVars';
import mongoose from "mongoose";
import {UserType} from "@src/types/mongo/user";


// **** Variables **** //

// Errors
const errors = {
  validation: 'JSON-web-token validation failed.',
} as const;

// Options
const options = {
  expiresIn: EnvVars.jwt.exp,
};


// **** Functions **** //

/**
 * Encrypt data and return jwt.
 */
export function sign(user: any): string {
  return jsonwebtoken.sign({_id: user._id}, EnvVars.jwt.secret, options);
}

/**
 * Decrypt JWT and extract client data.
 */
function decode<T>(jwt: string): mongoose.Types.ObjectId | null {
  return (jsonwebtoken.decode(jwt) as mongoose.Types.ObjectId);
}


// **** Export default **** //

export default {
  sign,
  decode,
} as const;
