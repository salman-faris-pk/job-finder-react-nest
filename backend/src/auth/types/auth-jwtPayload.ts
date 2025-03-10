import { Request } from "express";


export type AuthJwtpayload = {
    sub: string;
};


export interface GoogleUser {
    email: string;
    firstName: string;
    lastName: string;
    profileUrl: string;
    accessToken: string;
}

export type User ={
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    accountType:string;
}
   
export interface AuthenticatedRequest extends Request {
    user: User; 
}

export interface UserIdRequest extends Request {
    user: {
        id:string
    }
}