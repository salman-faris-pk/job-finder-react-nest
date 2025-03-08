import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from "@nestjs/jwt"
import { RegisterInputs } from "./dto/register.inputs"
import { LoginInputs } from "./dto/login.inputs"
import * as bcrypt from 'bcryptjs';
import { AuthJwtpayload } from './types/auth-jwtPayload';
import { Response } from "express"


@Injectable()
export class AuthService {

    constructor(
        private readonly prisma:PrismaService,
        private readonly jwtService:JwtService
    ){}


    async generatetoken(userId:string){
        const payload: AuthJwtpayload={ sub: userId};
        const accessToken= await this.jwtService.signAsync(payload,{
            expiresIn: process.env.JWT_EXPIRES_IN || '2d',
        });
        return { accessToken }
    };

    async registerUser(registerDto: RegisterInputs,res:Response){
       
        const {firstName,lastName,email,password}=registerDto;

        const userexists= await this.prisma.user.findUnique({
            where:{email}
        });

        if (userexists) {
            throw new BadRequestException('Email Address already exists');
        };

        const hashedpassword=await bcrypt.hash(password,10);
        const user=await this.prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password:hashedpassword
            }
        });

        const { accessToken }=await this.generatetoken(user.id);
        res.cookie('accessToken',accessToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 172800000, 
        });

        return res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType: user.accountType,
            },
        });

    };


    async LoginUser(logindto:LoginInputs,res:Response){
        
        const {email,password}=logindto;

        if (!email || !password) {
            throw new BadRequestException('Please provide user credentials');
        };

        const user= await this.prisma.user.findUnique({
            where:{email}
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        };
      
        const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            throw new UnauthorizedException('Invalid email or password');
        };

        const { accessToken }=await this.generatetoken(user.id);
        res.cookie('accessToken',accessToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 172800000, 
        });

        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            user: {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType: user.accountType,
            },
        });
    };


    async validateJwtUser(userId:string){
        const User=await this.prisma.user.findUnique({
            where:{
                id: userId
            }
        });

        if (!User) throw new UnauthorizedException('User not found!');
        const user = { id: User.id };
        return user;  

    };


    



};
