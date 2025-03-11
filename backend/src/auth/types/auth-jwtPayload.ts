import { Request } from "express";


export type AuthJwtpayload = {
    sub: string;
};


export type User ={
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    accountType:string;
    profileUrl?: string,
}
   
export interface AuthenticatedRequest extends Request {
    user: User; 
}

export interface UserIdRequest extends Request {
    user: {
        id:string
    }
}