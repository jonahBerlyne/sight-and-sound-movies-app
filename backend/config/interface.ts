import { Document } from "mongoose";
import { Request } from "express";

export interface UserInt extends Document {
 name: string;
 account: string;
 password: string;
 avatar: string;
 role: string;
 type: string;
 rf_token?: string;
 _doc: object;
}

export interface NewUserInt {
 name: string;
 account: string;
 password: string;
}

export interface DecodedTokenInt {
 id?: string;
 newUser?: NewUserInt;
 iat: number;
 exp: number;
}

export interface UserParamsInt {
 name: string;
 account: string;
 password: string;
 avatar?: string;
 type: string;
}

export interface ReqAuthInt extends Request {
 user?: UserInt;
}